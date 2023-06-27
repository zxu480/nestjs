import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffess.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class MockCoffeesService {}
class ConfigService {}
class DevConfigService {}
class ProdConfigService {}
@Injectable()
class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      //   useValue: ['buddy brew', 'nescafe'], // value provider demo
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(), // factory provider demo, can use async here
      inject: [CoffeeBrandsFactory],
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevConfigService
          : ProdConfigService, // class provider demo
    },
  ],
  //   providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }], // how to mock provider
  exports: [CoffeesService], // so can used CoffeeService in other Module
})
export class CoffeesModule {}
