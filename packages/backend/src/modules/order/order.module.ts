import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderController from './presentation/controller/order.controller';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import GetAllOrdersService from './domain/service/use-case/get-all-orders.service';
import OrderRepository from './infrastructure/db/repository/order.repository';
import GetOrdersAfterDateService from './domain/service/use-case/get-orders-after-date.service';
import GetOrdersBeforeDateService from './domain/service/use-case/get-orders-before-date.service';
import GetOrdersByCustomerService from './domain/service/use-case/get-orders-by-customer.service';
import { UpdateOrderToPayService } from './domain/service/use-case/update-order-to-pay.service';
import { CancelOrderService } from './domain/service/use-case/cancel-order.service';
import { DeleteOrderService } from './domain/service/use-case/delete-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrdersService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersBeforeDateService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetOrdersBeforeDateService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersAfterDateService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetOrdersAfterDateService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: UpdateOrderToPayService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new UpdateOrderToPayService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersByCustomerService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new GetOrdersByCustomerService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: CancelOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: DeleteOrderService,
      useFactory: (OrderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(OrderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

  ],
})
export default class OrderModule {}