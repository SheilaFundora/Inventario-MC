import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { productoService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-p.dto';
import { dependiente } from '../entities/dependiente.entity';
import { dependienteService } from '../services/dependiente.service';
import { CreateDependienteDto } from '../dto/create-dependiente.dto';

@Controller('api/cafeteria/dependiente')
export class dependienteController {

    constructor(
        private dependienteService:dependienteService
    )
    
    {}

    @Get()
    getAll(){
        return this.dependienteService.findAll();
    }
    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.dependienteService.getId(id);
    }

    @Post()
    async create(@Body() CreateDependienteDto:CreateDependienteDto){

            return await this.dependienteService.create(CreateDependienteDto);

        }

    

    @Put(':id')
    update(@Param('id') id:number, @Body() body:CreateDependienteDto)
    {return this.dependienteService.update(id,body)}


    @Delete(':id')
    delete(@Param('id') id:number){
        return this.dependienteService.Delete(id);
    }

}