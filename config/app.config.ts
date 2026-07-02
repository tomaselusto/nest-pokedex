//archivo de configuracion de las variables de entorno
//y configuración de la app

//esta función exportará las variables de entorno que se encuentran en el archivo .env
export const EnvConfiguration = () => ({
    //variable de entorno para saber en que ambiente estamos trabajando
    enviroment: process.env.NODE_ENV||'dev',
    //variable de entorno para la conexión a la base de datos
    mongodb: process.env.MONGODB,
    //variable de entorno para el puerto en el que se ejecutará la app
    port: process.env.PORT || 3002,

    //estoy mapeando mis variables de entorno a un objeto para poder inyectarlas en cualquier parte del proyecto

});