import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrappingGateway } from './websocket/websocket.gateway';
import { TranslatorModule } from './translator/translator.module';
import { ScrappingService } from './scrapping/scrapping.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    TranslatorModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScrappingGateway, ScrappingService],
})
export class AppModule {
  constructor(private readonly scrappingService: ScrappingService) {
    this.scrappingService
      .getTranslationResultObservable()
      .subscribe((result) => {
        console.log('Translation Result:', result);
      });
  }
}
