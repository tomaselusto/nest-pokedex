import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response-interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  
  private readonly axios: AxiosInstance;
  constructor( 
  @InjectModel(Pokemon.name) 
  private readonly pokemonModelo: Model<Pokemon>    
  ) {
    this.axios = axios;
  }
  async executeSeed() {
    await this.pokemonModelo.deleteMany({}); //eliminamos todos los pokemones de la base de datos antes de insertar los nuevos, para evitar duplicados
    //aca con axios hacemos la peticion a la api de pokeapi y 
    // obtenemos los datos de los pokemones. Además sumamos la interfaz de 
    // PokeResponse para tipar la respuesta de la api y evitar errores de tipado en el proyecto.
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    //forma ideal de tipar la respuesta de la api, ya que nos permite acceder a las propiedades de la respuesta de la api con autocompletado y sin errores de tipado.

    const pokemonToInsert:{name: string, no: number}[] = []; //array que va a contener los pokemones que vamos a insertar en la base de datos, con la forma {name: string, no: number}
    //ahora tenemos que extraer nombre y numero de cada pokemon y devolverlo en un array de objetos con la forma {name: string, url: string}
    data.results.forEach(async ({name, url}) => {
      //desestructuramos el objeto pokemon {name, url} para obtener el nombre y la url
      //console.log(`Nombre: ${name}, URL: ${url}`);
      const segments=url.split('/');
      const no :number= +segments[segments.length - 2];
      //console.log(`Nombre: ${name}, Número: ${no}`);

      pokemonToInsert.push({name, no});

      try{
       await this.pokemonModelo.insertMany(pokemonToInsert); //insertamos los pokemones en la base de datos, insertMany es más eficiente que create porque hace una sola inserción en la base de datos en lugar de una por cada pokemon
      }
      catch(error){
        console.error(`Error creating pokemon: ${name}`, error);
      }

    })
    return "Seed executed successfully";
    
  }
}
