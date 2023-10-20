import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import GetOrdersByCustomerService from './get-orders-by-customer.service';
import {
  ordersByCustomerMock,
} from '@src/modules/order/domain/service/utils/order-mock.fixture';

describe('Get All Orders For A Given Customer', () => {
  let orderRepositoryMock: OrderRepositoryInterface;

  beforeAll(() => {
    orderRepositoryMock = {
      searchOrdersByCustomer: () => [],
    } as unknown as OrderRepositoryInterface;
  });

  it('Should return orders if the customer name is valid', async () => {
    const orderRepositoryMockImpl = {
      ...orderRepositoryMock,
      searchOrdersByCustomer: () => ordersByCustomerMock,
    } as unknown as OrderRepositoryInterface;

    const orderRepositoryByCustomerService = new GetOrdersByCustomerService(orderRepositoryMockImpl);

    const returnValue = await orderRepositoryByCustomerService.getOrdersByCustomer('jeanpierrelecailloux');
    expect(returnValue).toEqual(ordersByCustomerMock);
  });

  it('Should return an error if the customer name is invalid', async () => {
    const orderRepositoryMockImpl = {
      ...orderRepositoryMock,
      findAllOrdersByCustomer: () => ordersByCustomerMock,
    } as unknown as OrderRepositoryInterface;

    const orderRepositoryByCustomerService = new GetOrdersByCustomerService(orderRepositoryMockImpl);
    await expect(orderRepositoryByCustomerService.getOrdersByCustomer('jeanpierrele4illou')).rejects.toThrow();
  });
});