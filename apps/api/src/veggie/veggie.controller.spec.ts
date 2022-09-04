import { Test, TestingModule } from '@nestjs/testing';
import { VeggieController } from './veggie.controller';
import { VeggieService } from './veggie.service';

describe('VeggieController', () => {
  let veggieController: VeggieController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VeggieController],
      providers: [VeggieService],
    }).compile();

    veggieController = app.get<VeggieController>(VeggieController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(veggieController.getHello()).toBe('Hello World!');
    // });
  });
});
