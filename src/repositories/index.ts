import 'reflect-metadata';
import { SportActivity } from '@entity/SportActivity';
import { DataSource } from 'typeorm';
import { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '@config';
import { City } from '@entity/City';
import { Country } from '@entity/Country';
import { Offerer } from '@entity/Offerer';
import { ServiceCategory } from '@entity/ServiceCategory';
import { UserReview } from '@entity/UserReview';

const AppDataSource = new DataSource({
  type: DB_TYPE as any,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [City, Country, Offerer, ServiceCategory, UserReview],
  subscribers: [],
  migrations: [],
});
export default AppDataSource;
