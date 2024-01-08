import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException, Patch } from '@nestjs/common';
import { CreateIPVDto } from '../dto/create-ipv.dto';
import { ipvService } from '../services/ipv.service';
import { ipv } from '../entities/ipv.entity';


@Controller('api/cafeteria/estado')
export class estadoController {

    constructor(
        private ipvService:ipvService
    )
    
    {}


    @Get()
    getStatus(): Promise<number[]>{
        return this.ipvService.getEstado();
    }


 
}