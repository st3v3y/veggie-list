import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { VeggieController } from './veggie.controller';
import { VeggieService } from './veggie.service';

@Module({
  imports: [],
  controllers: [VeggieController],
  providers: [VeggieService, PrismaService],
})
export class VeggieModule {}
