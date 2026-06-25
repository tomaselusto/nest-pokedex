import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';


//decorador que permite definir la clase como un esquema de Mongoose, lo que permite mapear la clase a una colección de MongoDB
@Schema()
export class Pokemon extends Document {
    //relación con BD, cada propiedad de la clase representa una columna en la tabla de la base de datos
    //mongo da un identificador único a cada registro, por lo que no es necesario definir un id manualmente
    @Prop({
        unique: true, //no se pueden repetir nombres de pokémon 
        index: true, //se crea un índice para optimizar las búsquedas por nombre    
    })
    name: string;
    @Prop({
        unique: true, 
        index: true, 
    })
    no: number; //número de pokémon


    constructor(name: string, no: number) {
        super();
        this.name = name;
        this.no = no;
    }


}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
