import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter-interface.js";
import { Injectable } from "@nestjs/common";


//la idea es envolver la libreria de axios en una clase que implemente la interfaz HttpAdapter, para poder usarla en el proyecto sin problemas de compatibilidad y sin tener que cambiar el codigo de la libreria externa
@Injectable() //decorador de NestJS que indica que esta clase es un servicio que puede ser inyectado en otros servicios o controladores
export class AxiosAdapter implements HttpAdapter {
    private axios: AxiosInstance = axios;
    
    async get<T>(url: string): Promise<T> {
        try{
            const {data} =  await this.axios.get<T>(url);  
              return data;

        }
        catch(error){
            throw new Error(`Error fetching data from ${url}: ${error}`);
        }
    }

    //recordar que debo exportarlo para poder importarlo y consumirlo en otros servicios o controladores, y asi poder usar la libreria de axios sin problemas de compatibilidad y sin tener que cambiar el codigo de la libreria externa



}
