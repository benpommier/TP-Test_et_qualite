import Order from "../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";


export default class GetAllOrdersService {

    constructor(
        private readonly OrderRepository: OrderRepositoryInterface
    ) {}

    async getAllOrders(): Promise<Order[]> {
        return await this.OrderRepository.searchAllOrders();
    }
}