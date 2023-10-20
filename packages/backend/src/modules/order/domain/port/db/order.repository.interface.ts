import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import Order from '../../model/entity/order.orm-entity';
import { SearchAllOrdersDtoInterface } from '@src/modules/order/presentation/dto/search-all-orders.dto.interface';

export interface OrderRepositoryInterface extends RepositoryInterface {
    searchAllOrders(): Promise<Order[]>;
    searchOrdersBeforeDate(date: Date): Promise<Order[]>;
    searchOrdersAfterDate(date: Date): Promise<Order[]>;
    searchOrdersByCustomer(customer: string): Promise<Order[]>;
    findOrderById(id: string): Promise<Order>;
}
