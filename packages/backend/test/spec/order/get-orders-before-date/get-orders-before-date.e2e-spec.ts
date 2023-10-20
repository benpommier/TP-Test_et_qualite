import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Orders Before Date ', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('return an error if orders are not a table', async () => {

    const getOrdersBeforeDate = await request(app.getHttpServer()).get('/api/Orders/before-date/2023-10-17');

    expect(getOrdersBeforeDate.body.length).toBe(0);
  });

  
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
