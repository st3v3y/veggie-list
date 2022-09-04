import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VeggieService } from './veggie.service';
import { PriceUnit, Veggie as VeggieModel } from '@prisma/client';

@Controller({
  version: '1',
  path: 'veggies',
})
export class VeggieController {
  constructor(private readonly veggieService: VeggieService) {}

  @Get('/:lang?')
  async getVeggies(
    @Param('lang') lang: 'en' | 'es' = 'en',
  ): Promise<VeggieModel[]> {
    if (lang == 'es') {
      return this.veggieService.veggies({
        orderBy: { name_es: 'asc' },
      });
    }
    return this.veggieService.veggies({
      orderBy: { name: 'asc' },
    });
  }

  @Post('create')
  async createVeggie(
    @Body()
    veggieData: {
      name: string;
      name_es: string;
      is_favorite: boolean;
      price: number;
      unit: PriceUnit;
      picture_url: string;
    },
  ): Promise<VeggieModel> {
    return this.veggieService.createVeggie(veggieData);
  }

  @Put('update/:id')
  async publishPost(
    @Param('id') id: string,
    @Body()
    veggieData: {
      // name: string;
      is_favorite: boolean;
      price: number;
      unit: PriceUnit;
      // picture_url: string;
    },
  ): Promise<VeggieModel> {
    return this.veggieService.updateVeggie({
      where: { id: Number(id) },
      data: veggieData,
    });
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: string): Promise<VeggieModel> {
    return this.veggieService.deleteVeggie({ id: Number(id) });
  }
}
