import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { CreateIPVDto } from '../dto/create-ipv.dto';
import { ipvService } from '../services/ipv.service';


@Controller('api/cafeteria/ipv')
export class ivpController {

    constructor(
        private ipvService:ipvService
    )
    
    {}

    @Get()
    getAll(){
        return this.ipvService.findAll();
    }
    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.ipvService.getId(id);
    }

    @Post()
    async create(@Body() CreateIPVDto:CreateIPVDto){
        try {
            return await this.ipvService.create(CreateIPVDto);
          } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
        }

    

    @Put(':id')
    update(@Param('id') id:number, @Body() body:any)
    {return this.ipvService.update(id,body)}


    @Delete(':id')
    delete(@Param('id') id:number){
        return this.ipvService.Delete(id);
    }

}