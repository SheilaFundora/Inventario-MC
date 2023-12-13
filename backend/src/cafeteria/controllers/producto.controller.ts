import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { productoService } from '../services/productos.service';


@Controller('api/cafeteria/producto')
export class productoController {

    constructor(
        private productoService:productoService
    )
    
    {}

    @Get()
    getAll(){
        return this.productoService.findAll();
    }
    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.productoService.getId(id);
    }

    @Post()
    create(@Body() body:any){
        return this.productoService.create(body);
    }

    @Put(':id')
    update(@Param('id') id:number, @Body() body:any)
    {return this.productoService.update(id,body)}


    @Delete(':id')
    delete(@Param('id') id:number){
        return this.productoService.Delete(id);
    }

}