import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import Order from "../../model/entity/order.orm-entity";

export class CancelOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async cancelOrder(id: string): Promise<Order> {

    const order = await this.orderRepository.findOrderById(id);

    if (!order) {
      throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
    }
    
    order.cancel();
    
    return await this.saveOrder(order);
  }

  private async saveOrder(orderToSave: DeepPartial<Order>): Promise<Order> {
    try {
      const order = await this.orderRepository.persist<Order>(orderToSave);

      return order;
    } catch (error) {
      throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist order : ${error.message}`);
    }
  }
}
