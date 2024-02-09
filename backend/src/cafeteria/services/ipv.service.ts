import { Injectable, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ipv } from '../entities/ipv.entity';
import { CreateIPVDto } from '../dto/create-ipv.dto';
import { producto } from '../entities/producto.entity';
import { productoService } from './productos.service';
import { take } from 'rxjs';



@Injectable()
export class ipvService {


    constructor(
        @InjectRepository(ipv) private ipvRepo: Repository<ipv>,
        @InjectRepository(producto) private productRepo: Repository<producto>,
    ) { }

    async findAll(): Promise<ipv[]> {
        return this.ipvRepo.find();
    }

    async getId(id: number): Promise<ipv> {

        return this.ipvRepo.findOneBy({ id });
    }


    async getIPV(id:number)
    {
    const arr = await this.ipvRepo.find();
    let arregloIPV:ipv[]=[];
    for  (var i of arr){
        if (i.ipvG_id.id==id){

            arregloIPV.push(i);
           

        }

    }
    return arregloIPV;
    }

    async getEstado(): Promise<number[]> {
        
        const arr = await this.ipvRepo.find({ relations: ['ipvsG'], where: {estado:'false'} });
        let ids:number[] = [];

        for (const recorrido of arr){
            ids.push(recorrido.id)
        }

        return ids
        }

    



    async create(body: CreateIPVDto[]) {



        const newIPV = this.ipvRepo.create(body);
        this.ipvRepo.save(newIPV);

    }

    async update(id: number, body: CreateIPVDto) {
        const inv = await this.ipvRepo.findOneBy({ id });
        if (!inv) {
            throw new Error('id no encontrado');
        }

        inv.ipvG_id=body.ipvG_id;
        inv.producto_id = body.producto_id;
        this.ipvRepo.merge(inv, body);
        return this.ipvRepo.save(inv);
    }




    async patch(id: number, dato: CreateIPVDto) {
        const inv = await this.ipvRepo.findOneBy({ id });
        if (!inv) {
            throw new Error('id no encontrado');
        }
        if (inv.estado === 'false') {
            inv.estado = 'true';
        }

        this.ipvRepo.merge(inv, dato)
        return this.ipvRepo.save(inv);
    }

    async Delete(id: number) {
        await this.ipvRepo.delete(id);
        return true;
    }


}


