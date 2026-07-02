<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Instalar componentes de NestJs para Mongoose
```
yarn add @nestjs/mongoose mongoose
```
6. Agregar Axios para realizar las peticiones HTTP (fetch solo anda con versiones posteriores a 18 de node).
```
yarn add axios@0.27.2
```
7. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```
8. clonar arhicvo __.env.template__ y renombrar la copia a __.env__
9. LLenar las variabales de entorno.
10. Ejecutar la la aplicación en dev:
```
yarn start:dev
```
Ejecutar paso 7



## Stack usado
* MongoDB
* Nest


