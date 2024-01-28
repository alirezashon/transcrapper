import { Module } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { ScrappingController } from './scrapping.controller';

@Module({
  providers: [ScrappingService],
  controllers: [ScrappingController]
})
export class ScrappingModule {}
