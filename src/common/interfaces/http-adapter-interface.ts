//definicion de lo que necesito para adaptar librerias de externos a mi proyecto, para que no tenga que cambiar el codigo de la libreria externa y pueda usarla en mi proyecto sin problemas de compatibilidad
export interface HttpAdapter {
    get<T> (url:string): Promise<T>;
}