import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from "../../domain/model/entity/order.orm-entity";
import GetAllOrdersService from '../../domain/service/use-case/get-all-orders.service';
import GetOrdersBeforeDateService from '../../domain/service/use-case/get-orders-before-date.service';
import GetOrdersAfterDateService from '../../domain/service/use-case/get-orders-after-date.service';
import GetOrdersByCustomerService from '../../domain/service/use-case/get-orders-by-customer.service';
import { UpdateOrderToPayService } from '../../domain/service/use-case/update-order-to-pay.service';
import { OrderPresenter } from '../presenter/order.presenter';
import { CancelOrderService } from '../../domain/service/use-case/cancel-order.service';
import { DeleteOrderService } from '../../domain/service/use-case/delete-order.service';

@Controller('/Orders')
export default class OrderController {
    constructor(
        private readonly getAllOrdersService: GetAllOrdersService,
        private readonly getOrdersBeforeDateService: GetOrdersBeforeDateService,
        private readonly getOrdersAfterDateService: GetOrdersAfterDateService,
        private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
        private readonly updateOrderToPayService: UpdateOrderToPayService,
        private readonly cancelOrderService: CancelOrderService,
        private readonly deleteOrderService: DeleteOrderService,
    ) {}
    
  @Get('')
  async searchAllOrders(): Promise<Order[]> {
    return await this.getAllOrdersService.getAllOrders();
  }

  // @Get('/before-date/:date')
  // async searchOrdersBeforeDate(date: Date): Promise<Order[]> {
  //   return await this.getOrdersBeforeDateService.getOrdersBeforeDate(date);
  // }

  @Get('/before-date/:date')
  async searchOrdersBeforeDate(@Param('date') dateInput: string): Promise<Order[]> {
    return await this.getOrdersBeforeDateService.getOrdersBeforeDate(dateInput);
  }
  

  @Get('/after-date/:date')
  async searchOrdersAfterDate(@Param('date') dateInput: string): Promise<Order[]> {
    return await this.getOrdersAfterDateService.getOrdersAfterDate(dateInput);
  }

  @Get('by-customer/:customer')
  async searchOrdersByCustomer(@Param('customer') customer: string): Promise<Order[]> {
    return await this.getOrdersByCustomerService.getOrdersByCustomer(customer);
  }

  @Patch('/:id/paid')
  async payOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.updateOrderToPayService.updateOrderToPay(id);
    return new OrderPresenter(order);
  }

  @Patch('/:id/cancel')
  async cancelOrder(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.cancelOrderService.cancelOrder(id);
    return new OrderPresenter(order);
  }

  @Delete('/:id/delete')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    const order = await this.deleteOrderService.deleteOrder(id);
    return order;
  }

}