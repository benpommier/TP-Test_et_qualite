import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import Order from "../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";


export default class GetOrdersByCustomerService {

    constructor(
        private readonly OrderRepository: OrderRepositoryInterface
    ) {}

    async getOrdersByCustomer(customer: string): Promise<Order[]> {

        const regex = /^[a-zA-Z ]+$/;
        if (customer.length < 6 || !regex.test(customer)) {
            throw new Exception(ExceptionTypeEnum.BadRequest, 'Customer name not good not good')
        }

        return await this.OrderRepository.searchOrdersByCustomer(customer);
    }
}