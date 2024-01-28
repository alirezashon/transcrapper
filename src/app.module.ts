import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrappingModule } from './scrapping/scrapping.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
  @Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScrappingModule,
   ],
  controllers: [AppController ],
  providers: [AppService, WebsocketGateway ],
})
export class AppModule {}
