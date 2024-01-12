import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { productoService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-p.dto';
import { dependiente } from '../entities/dependiente.entity';
import { dependienteService } from '../services/dependiente.service';
import { CreateDependienteDto } from '../dto/create-dependiente.dto';
import { cafeteria } from '../entities/cafeteria.entity';
import { cafeteriaService } from '../services/cafeteria.service';
import { CreateCafeteriaDto } from '../dto/create-cafeteria.dto';
@Controller('api/cafeteria/salario')
export class cafeteriaController {

    constructor(
        private cafeteriaService:cafeteriaService
    )
    
    {}

    @Get(':id')
    getOne(@Param('id') id : number){
        return this.cafeteriaService.getSalario(id);
    }


}