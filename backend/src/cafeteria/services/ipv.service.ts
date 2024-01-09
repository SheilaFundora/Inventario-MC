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
        return this.ipvRepo.find({ relations: ['ipvsG'] });
    }

    async getId(id: number): Promise<ipv> {

        return this.ipvRepo.findOneBy({ id });
    }



    async getEstado(): Promise<number[]> {
        
        const arr = await this.ipvRepo.find({ relations: ['ipvsG'], where: {estado:'false'} });
        const ids:number[] = [];

        for (const recorrido of arr){
            ids.push(recorrido.id)
        }

        return ids
        }

    



    async create(body: CreateIPVDto[]) {



        //        const producto = await this.productRepo.findOneBy(body.producto_id)
        //     if (producto.cantidad >=body.venta){
        //       producto.cantidad=producto.cantidad - body.venta;
        //     this.updateP(producto.id,producto);
        //}
        //else throw new Error('No hay suficientes productos en el inventario')
        const newIPV = this.ipvRepo.create(body);
        return this.ipvRepo.save(newIPV);
    }

    async update(id: number, body: CreateIPVDto) {
        const inv = await this.ipvRepo.findOneBy({ id });
        if (!inv) {
            throw new Error('id no encontrado');
        }


        inv.producto_id = body.producto_id;
        inv.cafeteria_id = body.cafeteria_id;
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

    async updateP(id: number, body: any) {
        const product = await this.productRepo.findOneBy({ id });
        if (!product) {
            throw new Error('id no encontrado');
        }
        this.productRepo.merge(product, body);
        return this.productRepo.save(product);
    }
}


