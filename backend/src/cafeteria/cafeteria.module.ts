import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { producto } from './entities/producto.entity';
import { productoController } from './controllers/producto.controller';
import { productoService } from './services/productos.service';
import { ipvService } from './services/ipv.service';
import { ivpController } from './controllers/ipv.controller';
import { ipv } from './entities/ipv.entity';


@Module({
    imports:[
      TypeOrmModule.forFeature([producto,ipv])
    ],
    providers: [productoService,ipvService],
    controllers: [productoController,ivpController]
  
  })
  export class productos {
  
  }