import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    //forFeature permite registrar un esquema de Mongoose en el módulo, lo que permite a 
    // NestJS inyectar el modelo de Mongoose en los servicios y controladores del módulo
    MongooseModule.forFeature([
      { 
        //name: nombre del modelo de Mongoose, 
        // que se utiliza para inyectar el modelo en los 
        // servicios y controladores del módulo
        name: Pokemon.name, 
        schema: PokemonSchema ,
      }])
  ],
})
export class PokemonModule {}
