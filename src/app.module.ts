import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from '../config/app.config';
import { JoiValidationSchema } from '../config/joi.validation';



//para usar variables de entonromento, se debe instalar el paquete yarn add @nestjs/config
@Module({
  imports: [
    //esto va siempre al inicio para que las variables de entorno se carguen antes de cualquier otro modulo
    //el configuration module nos permitirá hacer las inyecciones de las variables de entorno en cualquier parte del proyecto
    ConfigModule.forRoot({ 
      //esta opción nos permite cargar las variables de entorno desde el archivo .env
      load: [EnvConfiguration],
      //esta opción nos permite validar las variables de entorno con el esquema de validación que creamos en el archivo joi.validation.ts
      validationSchema: JoiValidationSchema,
    }),


    ServeStaticModule.forRoot({
      rootPath: join (__dirname,'..','public'),
    }),

    //referencia a base de datos 
    MongooseModule.forRoot(EnvConfiguration().mongodb as string),

    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
