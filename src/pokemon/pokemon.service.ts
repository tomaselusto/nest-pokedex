import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException,  } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';

@Injectable()
export class PokemonService {


  //las inyecciones de dependencias se hacen en el constructor
  constructor(
    //inyectar modelos  para poder usarlo en el servicio, se hace con el decorador @InjectModel y se pasa el nombre del modelo
    @InjectModel(Pokemon.name) //decorador que indica que se va a inyectar el modelo de pokemon, 
    //sin él no se puede inyectar el modelo de pokemon
    private readonly pokemonModelo: Model<Pokemon> 

    //usar el pokemon service para crear pokemones en la base de datos,es más limpio para la arquitectura del proyecto, 
    // ya que el seed service no debería tener acceso directo a la base de datos, sino que debería usar el servicio de pokemon para crear pokemones
  ) {}
  //las inserciones son asincronas, por lo que hay que usar async y await
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name= createPokemonDto.name.toLowerCase();
    //acá también tenemos que hacer la inserción en la base de datos, para eso usamos el modelo de pokemon que inyectamos en el constructor
    
    try{
      const pokemon=  new this.pokemonModelo(createPokemonDto); 
      //creamos una instancia del modelo de pokemon con los datos del dto 
      
      //guardamos el pokemon en la base de datos
      await pokemon.save();
      

      return pokemon;

    }
    catch (error: any) {
      this.handleExceptions(error); //método para manejar errores, lo creamos más abajo
    }

    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  //será asincrono porque va a buscar en la base de datos, por lo que hay que usar async y await
  async findOne(id: string) {
   
    let pokemon : Pokemon | null =null; //variable que va a contener el pokemon que se va a buscar, puede ser nula si no se encuentra el pokemon
    
    if( !isNaN(+id)){ //si es un numero, por lo que buscamos por número
      pokemon= await this.pokemonModelo.findOne({no:+id});
    } 
    
    //Verificación por MongoID 
    if(!pokemon && isValidObjectId(id)){ //si no se encontró el pokemon por número y es un id válido de MongoDB, buscamos por id
      pokemon = await this.pokemonModelo.findById(id);
    }   

    //con ifs separados es más legible y fácil de entender, además de que permite agregar más condiciones en el futuro si es necesario
        
    if(!pokemon){ //si no se encontró el pokemon por número ni por id, buscamos por nombre
      pokemon= await this.pokemonModelo.findOne({name:id.toLowerCase().trim()});
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id or name "${id}" not found`);
    }
    
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id); //buscamos el pokemon por id o nombre, si no se encuentra lanza una excepción
    if(updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
        await pokemon.updateOne(updatePokemonDto); //actualizamos el pokemon con los datos del dto
        //el método updateOne devuelve un objeto con información sobre la operación, pero no el pokemon actualizado, por eso no lo retornamos
        return {...pokemon.toJSON(), ...updatePokemonDto}; //retornamos el pokemon actualizado, pero no es el pokemon actualizado, sino una copia del pokemon original con los datos del dto actualizados
    }
    catch (error: any) {
      this.handleExceptions(error); 
    }
  } 

  async remove(id: string) {
    //eliminación por id, si no se encuentra el pokemon lanza una excepción
    
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne(); //eliminamos el pokemon de la base de datos
  
    //acá tenemos que asegurarnos de que estemos buscando un mongoID, 
    //por eso vamos a usar un pipe customizado que valide a nivel global un MongoID.
    //const res= await this.pokemonModelo.findByIdAndDelete(id); //eliminamos el pokemon de la base de datos por id
    
    //debemos evitar la doble consulta a la BD, hacerlo en un solo paso.
    const {deletedCount}= await this.pokemonModelo.deleteOne({_id:id}); //eliminamos el pokemon de la base de datos por i
    if(deletedCount===0){ //si no se eliminó ningún pokemon, lanzamos una excepción
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  //MÉTODO PARA MANEJAR ERRORES en Excepciones NO CONTROLADAS
  private handleExceptions(error: any) {
    if (error?.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  } 
}
