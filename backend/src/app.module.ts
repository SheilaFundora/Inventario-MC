import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import { productos } from './cafeteria/cafeteria.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      database: 'Inventario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true,
      retryDelay:3000,
      retryAttempts:10,
    }),
    productos
    
      
      
      
    
],
  controllers: [],
  providers: [],
})
export class AppModule {

  constructor(){
    this.init()
  }

  async init() {
    /* Conexion con postgresql */
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'Inventario',
      password: 'postgres',
      port: 5432,
    });

    await client.connect();
    console.log('Conectado a la API')
    console.log('Mapeando base de datos...')
}


}
