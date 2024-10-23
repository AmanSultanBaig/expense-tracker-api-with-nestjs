import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from './schemas/source.schema';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Source.name, schema: SourceSchema }]),
  ],
  providers: [SourceService],
  controllers: [SourceController],
})
export class SourceModule {}
