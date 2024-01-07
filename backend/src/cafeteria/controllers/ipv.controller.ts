import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException, Patch } from '@nestjs/common';
import { CreateIPVDto } from '../dto/create-ipv.dto';
import { ipvService } from '../services/ipv.service';
import { ipv } from '../entities/ipv.entity';


@Controller('api/cafeteria/ipv')
export class ivpController {

    constructor(
        private ipvService:ipvService
    )
    
    {}

    @Get()
    getAll(): Promise<ipv[]>{
        return this.ipvService.findAll();
    }
    
    @Get(':id')
    getOne(@Param('id') id : number): Promise<ipv>{
        return this.ipvService.getId(id);
    }

    @Get(':id')
    getStatus(@Param('id') id : number): Promise<ipv>{
        return this.ipvService.getEstado(id);
    }




    @Post()
    async create(@Body() CreateIPVDto:CreateIPVDto[]){

            return await this.ipvService.create(CreateIPVDto);

        }

    

    @Put(':id')
    update(@Param('id') id:number, @Body() body:CreateIPVDto)
    {return this.ipvService.update(id,body)}


    @Patch(':id')
    patch(@Param('id') id:number, @Body() body:CreateIPVDto)
    {return this.ipvService.patch(id,body)}

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.ipvService.Delete(id);
    }

}