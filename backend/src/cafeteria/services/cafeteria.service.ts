import { Injectable, Body, Delete, BadRequestException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { producto } from '../entities/producto.entity';
import { cafeteria } from '../entities/cafeteria.entity';
import { CreateCafeteriaDto } from '../dto/create-cafeteria.dto';


@Injectable()
export class cafeteriaService {


    constructor(
        @InjectRepository(cafeteria) private cafeteriaRep:Repository<cafeteria>,

    )
    {}

    findAll()
    {
    return  this.cafeteriaRep.find();
    }

    getId(id: number)
    {
        return this.cafeteriaRep.findOneBy({id});
    }

    async create(cafeteria: CreateCafeteriaDto): Promise<cafeteria> {
        const caf = await this.cafeteriaRep.find();

        for (const cafe of caf){

           if (cafe.nombre===cafeteria.nombre){
               throw new HttpException('Cafeteria with this name already exists',HttpStatus.BAD_REQUEST);
           }
        }
        const newCafeteria = this.cafeteriaRep.create(cafeteria);
        return this.cafeteriaRep.save(newCafeteria);
      }
    

    async update (id:number, body:any){
        const cafeteria = await this.cafeteriaRep.findOneBy({id});
        if (!cafeteria) {
            throw new Error('id no encontrado');
          }
          this.cafeteriaRep.merge(cafeteria, body);
          return this.cafeteriaRep.save(cafeteria);
    }


    async Delete(id:number){
        await this.cafeteriaRep.delete(id);
        return true;
    }

}