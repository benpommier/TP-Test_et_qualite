import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Orders By Customer ', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('if customer name is not respected (use of numbers), we expect to get a error 400', async () => {

    const getOrdersByCustomerResponse = await request(app.getHttpServer()).get('/api/Orders/by-customer/jean12345');

    expect(getOrdersByCustomerResponse.status).toBe(400);
  });

  it('if customer name is not respected (less than 5 characters), we expect to get a error 400', async () => {

    const getOrdersByCustomerResponse = await request(app.getHttpServer()).get('/api/Orders/by-customer/jean');

    expect(getOrdersByCustomerResponse.status).toBe(400);
  });

  it('if customer name is respected, we expect to get a 200', async () => {

    const getOrdersByCustomerResponse = await request(app.getHttpServer()).get('/api/Orders/by-customer/jeanpierre');

    expect(getOrdersByCustomerResponse.status).toBe(200);
  });
  
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
