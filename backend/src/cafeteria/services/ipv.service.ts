import { Injectable, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { ipv } from '../entities/ipv.entity';
import { promises } from 'dns';
import { CreateIPVDto } from '../dto/create-ipv.dto';




@Injectable()
export class ipvService {


    constructor(
        @InjectRepository(ipv) private ipvRepo:Repository<ipv>,

    )
    {}

    async findAll(): Promise<ipv[]>
    {
    return  this.ipvRepo.find({relations:['ipvsG']});
    }

    async getId(id: number): Promise<ipv>
    {

        return this.ipvRepo.findOneBy({id});
    }

    create(body:CreateIPVDto){
        const newIPV = this.ipvRepo.create(body);
        return this.ipvRepo.save(newIPV);
    }

    async update (id:number, body:any){
        const inv = await this.ipvRepo.findOneBy({id});
        if (!inv) {
            throw new Error('id no encontrado');
          }
        
        
        inv.producto_id=body.producto_id;
        this.ipvRepo.merge(inv, body);
        return this.ipvRepo.save(inv);
    }


    async Delete(id:number){
        await this.ipvRepo.delete(id);
        return true;
    }

}