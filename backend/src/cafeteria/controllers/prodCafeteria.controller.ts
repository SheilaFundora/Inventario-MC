import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { productoService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-p.dto';


@Controller('api/cafeteria/productoCafeteria')
export class productoCafateriaController {

    constructor(
        private productoService:productoService
    )
    
    {}

    @Get(':id')
    getAll(@Param('id') id : number){
        return this.productoService.findProdCaf(id);
    }

}