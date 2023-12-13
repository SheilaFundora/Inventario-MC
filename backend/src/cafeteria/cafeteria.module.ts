import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { producto } from './entities/producto.entity';
import { productoController } from './controllers/producto.controller';
import { productoService } from './services/productos.service';


@Module({
    imports:[
      TypeOrmModule.forFeature([producto])
    ],
    providers: [productoService],
    controllers: [productoController]
  
  })
  export class productos {
  
  }