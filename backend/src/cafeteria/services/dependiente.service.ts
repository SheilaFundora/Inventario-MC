import { Injectable, Body, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { producto } from '../entities/producto.entity';
import { cafeteria } from '../entities/cafeteria.entity';
import { dependiente } from '../entities/dependiente.entity';


@Injectable()
export class dependienteService {


    constructor(
        @InjectRepository(dependiente) private dependienteRep:Repository<dependiente>,

    )
    {}

    findAll()
    {
    return  this.dependienteRep.find();
    }

    getId(id: number)
    {
        return this.dependienteRep.findOneBy({id});
    }

    async create(dependiente: dependiente): Promise<dependiente> {
        const existingDependiente = await this.dependienteRep.findOne({where:dependiente});
    
        if (existingDependiente) {
          throw new NotFoundException('Clerk with this name already exists');
        }
    
        const newCafeteria = this.dependienteRep.create(dependiente);
        return this.dependienteRep.save(newCafeteria);
      }
    

    async update (id:number, body:any){
        const dependiente = await this.dependienteRep.findOneBy({id});
        if (!dependiente) {
            throw new Error('id no encontrado');
          }
          this.dependienteRep.merge(dependiente, body);
          return this.dependienteRep.save(dependiente);
    }


    async Delete(id:number){
        await this.dependienteRep.delete(id);
        return true;
    }

}