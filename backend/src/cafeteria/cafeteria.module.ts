import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { producto } from './entities/producto.entity';
import { productoController } from './controllers/producto.controller';
import { productoService } from './services/productos.service';
import { ipvService } from './services/ipv.service';
import { ivpController } from './controllers/ipv.controller';
import { ipv } from './entities/ipv.entity';
import { ipvGService } from './services/ipvG.service';
import { ivpGController } from './controllers/ipvG.controller';
import { ipvGlobal } from './entities/ipvGlobal.entity';


@Module({
    imports:[
      TypeOrmModule.forFeature([producto,ipv,ipvGlobal])
    ],
    providers: [productoService,ipvService, ipvGService],
    controllers: [productoController,ivpController, ivpGController]
  
  })
  export class productos {
  
  }