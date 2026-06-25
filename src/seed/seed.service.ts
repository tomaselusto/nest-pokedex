import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response-interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = axios;
  }
  async executeSeed() {
    //aca con axios hacemos la peticion a la api de pokeapi y 
    // obtenemos los datos de los pokemones. Además sumamos la interfaz de 
    // PokeResponse para tipar la respuesta de la api y evitar errores de tipado en el proyecto.
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    //ahora tenemos que extraer nombre y numero de cada pokemon y devolverlo en un array de objetos con la forma {name: string, url: string}
    data.results.forEach(({name, url}) => {
      //desestructuramos el objeto pokemon {name, url} para obtener el nombre y la url
      //console.log(`Nombre: ${name}, URL: ${url}`);
      const segments=url.split('/');
      const no :number= +segments[segments.length - 2];
      console.log(`Nombre: ${name}, Número: ${no}`);
      
    })
    
    return data.results
  }
}
