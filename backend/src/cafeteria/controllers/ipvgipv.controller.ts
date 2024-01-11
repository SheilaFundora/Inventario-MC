import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { CreateIPVGDto } from '../dto/create-ipv-global.dto';
import { ipvGService } from '../services/ipvG.service';
import { ipvGlobal } from '../entities/ipvGlobal.entity';
import { ipv } from '../entities/ipv.entity';
import { ipvService } from '../services/ipv.service';


@Controller('api/cafeteria/ipvarr')
export class ivparrController {

    constructor(
        private ipvService:ipvService
    )
    
    {}


    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.ipvService.getIPV(id);
    }

    }
