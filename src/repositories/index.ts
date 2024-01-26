import 'reflect-metadata';
import { SportActivity } from '@entity/SportActivity';
import { SportMembership } from '@entity/SportMembership';
import { UserClockIn } from '@entity/UserClockIn';
import { DataSource } from 'typeorm';
import { UserClockInSubscriber } from '@/subscriber/UserClockInSubscriber';
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '@config';
import { SportCenter } from '@entity/ServiceCategory';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  //TODO: see how to log using the global logger
  //   synchronize: NODE_ENV === 'dev' ? false : false,
  //   logging: NODE_ENV === 'dev' ? false : false,
  entities: [SportCenter, SportActivity, SportMembership, UserClockIn],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [UserClockInSubscriber],
});
export default AppDataSource;
