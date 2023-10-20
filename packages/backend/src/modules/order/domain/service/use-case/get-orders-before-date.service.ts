import Order from "../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";


export default class GetOrdersBeforeDateService {

    constructor(
        private readonly OrderRepository: OrderRepositoryInterface
    ) {}

    async getOrdersBeforeDate(dateInput: string): Promise<Order[]> {
        const date = new Date(dateInput)

        return await this.OrderRepository.searchOrdersBeforeDate(date);
    }
}