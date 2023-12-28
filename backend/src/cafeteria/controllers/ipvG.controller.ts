import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { CreateIPVGDto } from '../dto/create-ipv-global.dto';
import { ipvGService } from '../services/ipvG.service';


@Controller('api/cafeteria/ipvG')
export class ivpGController {

    constructor(
        private ipvGService:ipvGService
    )
    
    {}

    @Get()
    getAll(){
        return this.ipvGService.findAll();
    }
    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.ipvGService.getId(id);
    }

    @Post()
    async create(@Body() CreateIPVGDto:CreateIPVGDto){
        try {
            return await this.ipvGService.create(CreateIPVGDto);
          } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
        }

    

    @Put(':id')
    update(@Param('id') id:number, @Body() body:any)
    {return this.ipvGService.update(id,body)}


    @Delete(':id')
    delete(@Param('id') id:number){
        return this.ipvGService.Delete(id);
    }

}