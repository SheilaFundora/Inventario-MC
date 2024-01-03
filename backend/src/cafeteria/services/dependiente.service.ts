import { Injectable, Body, Delete, BadRequestException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { producto } from '../entities/producto.entity';
import { cafeteria } from '../entities/cafeteria.entity';
import { dependiente } from '../entities/dependiente.entity';
import { CreateDependienteDto } from '../dto/create-dependiente.dto';


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

    async create(dependiente: CreateDependienteDto): Promise<dependiente> {
        const dep = await this.dependienteRep.find();

        for (const depe of dep){

           if (depe.nombre===dependiente.nombre){
               throw new HttpException('Dependiente with this name already exists',HttpStatus.BAD_REQUEST);
           }
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