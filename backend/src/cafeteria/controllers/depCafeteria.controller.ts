import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { productoService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-p.dto';
import { dependienteService } from '../services/dependiente.service';


@Controller('api/cafeteria/dependienteCafeteria')
export class dependienteCafeteriaController {

    constructor(
        private dependienteService:dependienteService
    )
    
    {}

    @Get(':id')
    getAll(@Param('id') id : number){
        return this.dependienteService.findByCaf(id);
    }

}