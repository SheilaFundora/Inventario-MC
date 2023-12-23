import { Injectable, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { ipv } from '../entities/ipv.entity';




@Injectable()
export class ipvService {


    constructor(
        @InjectRepository(ipv) private ipvRepo:Repository<ipv>,

    )
    {}

    findAll()
    {
    return  this.ipvRepo.find();
    }

    getId(id: number)
    {
        return this.ipvRepo.findOneBy({id});
    }

    create(body:any){
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