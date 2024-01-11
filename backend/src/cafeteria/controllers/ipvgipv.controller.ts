import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { CreateIPVGDto } from '../dto/create-ipv-global.dto';
import { ipvGService } from '../services/ipvG.service';
import { ipvGlobal } from '../entities/ipvGlobal.entity';
import { ipv } from '../entities/ipv.entity';


@Controller('api/cafeteria/ipvarr')
export class ivparrController {

    constructor(
        private ipvGService:ipvGService
    )
    
    {}


    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.ipvGService.getIPV(id);
    }

    }
