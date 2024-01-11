import { Injectable, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { ipvGlobal } from '../entities/ipvGlobal.entity';
import { CreateIPVGDto } from '../dto/create-ipv-global.dto';




@Injectable()
export class ipvGService {


    constructor(
        @InjectRepository(ipvGlobal) private ipvGRepo:Repository<ipvGlobal>,

    )
    {}

    async findAll(): Promise<ipvGlobal[]>
    {
    return  this.ipvGRepo.find({relations:['ipv_id']});
    }

    async getId(id: number): Promise<ipvGlobal>
    {
        return this.ipvGRepo.findOneBy({id});
    }

    async create(body:any){
        const newIPV = this.ipvGRepo.create(body);
        return this.ipvGRepo.save(newIPV);
    }

    async update (id:number, body:any){
        const invG = await this.ipvGRepo.findOneBy({id});
        if (!invG) {
            throw new Error('id no encontrado');
          }
        
        
          invG.cafeteria_id = body.cafeteria_id;
          invG.ipv_id=body.ipv_id;
        this.ipvGRepo.merge(invG, body);
        return this.ipvGRepo.save(invG);
    }


    async Delete(id:number){
        await this.ipvGRepo.delete(id);
        return true;
    }

}