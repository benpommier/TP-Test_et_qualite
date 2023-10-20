import Order from "../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";


export default class GetOrdersAfterDateService {

    constructor(
        private readonly OrderRepository: OrderRepositoryInterface,
    ) {}

    async getOrdersAfterDate(dateInput: string): Promise<Order[]> {
        const date = new Date(dateInput)

        return await this.OrderRepository.searchOrdersAfterDate(date);
    }
}