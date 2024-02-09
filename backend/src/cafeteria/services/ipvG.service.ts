import { Injectable, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {EntityManager, Repository} from 'typeorm'
import { ipvGlobal } from '../entities/ipvGlobal.entity';
import { CreateIPVGDto } from '../dto/create-ipv-global.dto';
import { dependiente } from '../entities/dependiente.entity';
import { ipv } from '../entities/ipv.entity';
import { CreateIPVDto } from '../dto/create-ipv.dto';
import { producto } from '../entities/producto.entity';




@Injectable()
export class ipvGService {


    constructor(
        @InjectRepository(ipvGlobal) private ipvGRepo:Repository<ipvGlobal>,
        @InjectRepository(ipv) private ipvRepo:Repository<ipv>,
        @InjectRepository(producto) private productRepo: Repository<producto>,
    )
    {}

    async findAll(): Promise<ipvGlobal[]>
    {
    return  this.ipvGRepo.find();
    }

    async getId(id: number): Promise<ipvGlobal>
    {
        return this.ipvGRepo.findOneBy({id});
    }

    async create(body:CreateIPVGDto){
        const newIPV = this.ipvGRepo.create(body);
        const transactionEntityManager = this.ipvGRepo.manager.transaction(
            async (transactionalEntityManager: EntityManager) => {
              const savedIpvGeneral = await transactionalEntityManager.save(newIPV);
      
              // Asocia detalles y guárdalos
              const ipvDetalleEntities = body.ipvs.map((ipvDetalleData: CreateIPVDto) => {
                const ipvDetalle = this.ipvRepo.create({
                  ...ipvDetalleData,
                  ipvG_id: savedIpvGeneral,
                });
                return ipvDetalle;
              });
      
              await transactionalEntityManager.save(ipvDetalleEntities);
            },
          );
          const ipv =  await this.ipvRepo.find();
          const productos = await this.productRepo.find();
          for (var i of ipv){
              for (var o of productos){
                  if (i.producto_id.id == o.id && i.venta <= o.cantidad){
                      this.updateCantidades(o.id,i.venta)
                  }
              }
          }

    }


    async updateCantidades(id: number, cantidad:number) {
      const product = await this.productRepo.findOneBy({ id });
      product.cantidad = product.cantidad - cantidad;
      return this.productRepo.save(product);
  }







    async update (id:number, body:CreateIPVGDto){
        const invG = await this.ipvGRepo.findOneBy({id});
        if (!invG) {
            throw new Error('id no encontrado');
          }
        
        
          invG.cafeteria_id = body.cafeteria_id;
          invG.dependiente_id = body.dependiente_id;
        this.ipvGRepo.merge(invG, body);
        return this.ipvGRepo.save(invG);
    }


    async Delete(id:number){
        await this.ipvGRepo.delete(id);
        return true;
    }

}