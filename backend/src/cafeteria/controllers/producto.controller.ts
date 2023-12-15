import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { productoService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-p.dto';


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
    create(@Body() CreateProductoDto:CreateProductoDto){
        try{
            return this.productoService.create(CreateProductoDto);
        }
        catch (error){
            if (error.code ==='400'){
                throw new HttpException('Datos duplicados', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    

    @Put(':id')
    update(@Param('id') id:number, @Body() body:any)
    {return this.productoService.update(id,body)}


    @Delete(':id')
    delete(@Param('id') id:number){
        return this.productoService.Delete(id);
    }

}