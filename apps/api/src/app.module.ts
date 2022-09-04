import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { VeggieModule } from './veggie/veggie.module';

@Module({
  imports: [
    VeggieModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
