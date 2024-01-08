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
import { cafeteria } from './entities/cafeteria.entity';
import { dependiente } from './entities/dependiente.entity';
import { dependienteService } from './services/dependiente.service';
import { cafeteriaService } from './services/cafeteria.service';
import { cafeteriaController } from './controllers/cafeteria.controller';
import { dependienteController } from './controllers/dependiente.controller';
import { estadoController } from './controllers/estado.controller';


@Module({
    imports:[
      TypeOrmModule.forFeature([producto,ipv,ipvGlobal,cafeteria,dependiente])
    ],
    providers: [productoService,ipvService, ipvGService,dependienteService,cafeteriaService],
    controllers: [productoController,ivpController, ivpGController,cafeteriaController, dependienteController,estadoController]
  
  })
  export class productos {
  
  }