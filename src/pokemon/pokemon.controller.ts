import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from '../common/dto/pagnation-dto';


@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()  
  //@HttpCode(HttpStatus.OK) --> para que devuelva un 200 en vez de un 201,
  //Para personalizar el código de estado HTTP que se devuelve en la respuesta, se puede usar el decorador @HttpCode() en el método del controlador.
  //@HttpCode(200) para que devuelva un 200 en vez de un 201, 
  //ya que el 201 es para cuando se crea un recurso y acá no se está creando un recurso, sino que se está haciendo una inserción en la base de datos
  create(@Body() createPokemonDto: CreatePokemonDto) {
    //acá no debe haber lógica.
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  
  findAll(@Query() paginationDto:PaginationDto) {
    //@query queryParameters -> decorador para agregar queryparameters
    //Creo un dto para manejar los queryParameters
    //hay que transformar lso parametros porque siempre son STINGS --> desde los global pipes.


    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  //podemos usar un pipe para validar que sea un MongoID, creamos un custom pipe
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
