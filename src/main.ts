import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app es la aplicación de NestJS que se está creando y configurando. Se utiliza para inicializar y configurar la aplicación antes de que comience a escuchar las solicitudes entrantes.
  //opción global setglobalprefix, donde puedo especificar el 
  // prefijo que quiero para todas las rutas de mi aplicación. Esto es útil para organizar y versionar mis endpoints.
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //elimina propiedades que no están definidas en el DTO.
    forbidNonWhitelisted: true, //lanza un error si se envían propiedades que no están definidas en el DTO.
    }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
