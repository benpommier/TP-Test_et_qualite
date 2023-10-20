import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';
import { Inject } from '@nestjs/common';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,

    @Inject(OrmEntityToDomainEntityMapper)
    private readonly ormEntityToDomainEntityMapper: OrmEntityToDomainEntityMapper
  ) {
    super(Order, datasource.createEntityManager());
  }

  async searchAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('Order');

    return await query.getMany();

  }

  async searchOrdersBeforeDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('Order');

    query.where('Order.createdAt < :date', {
      date,
    });
    
    return await query.getMany();
  }

  async searchOrdersAfterDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('Order');

    query.where('Order.createdAt >= :date', {
      date,
    });

    return await query.getMany();
  }

  async searchOrdersByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('Order');

    query.where('Order.customer = :customer', {
      customer,
    });

    return await query.getMany();
  }

  async findOrderById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('Order');

    query.where('Order.id = :id', { id });

    const order = await query.getOne();

    return order;
  }

  async persist<Order>(entityToBePersisted: DeepPartial<Order>): Promise<Order> {
    const orderToBePersisted = this.create(entityToBePersisted);
    const orderPersisted = await this.save(orderToBePersisted);

    return (await this.findOrderById(orderPersisted.id)) as unknown as Order;
  }
}
