import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Veggie, Prisma } from '@prisma/client';

@Injectable()
export class VeggieService {
  constructor(private prisma: PrismaService) {}

  async veggies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VeggieWhereUniqueInput;
    where?: Prisma.VeggieWhereInput;
    orderBy?: Prisma.VeggieOrderByWithRelationInput;
  }): Promise<Veggie[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.veggie.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createVeggie(data: Prisma.VeggieCreateInput): Promise<Veggie> {
    return this.prisma.veggie.create({
      data,
    });
  }

  async updateVeggie(params: {
    where: Prisma.VeggieWhereUniqueInput;
    data: Prisma.VeggieUpdateInput;
  }): Promise<Veggie> {
    const { where, data } = params;
    return this.prisma.veggie.update({
      data,
      where,
    });
  }

  async deleteVeggie(where: Prisma.VeggieWhereUniqueInput): Promise<Veggie> {
    return this.prisma.veggie.delete({
      where,
    });
  }
}
