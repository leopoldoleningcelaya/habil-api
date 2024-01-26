import { pagination } from 'typeorm-pagination';
import * as config from '@config';
import AuthRoute from '@routes/auth.route';
import HealthRoute from '@routes/health.route';
import UsersRoute from '@routes/users.route';
import App from '@utils/app';
import { validateEnv } from '@utils/validateEnv';
validateEnv();

const app = new App(
  config,
  [],
  '/api/v1',
  [new AuthRoute(), new UsersRoute(), new HealthRoute()],
  '/internal/v1',
  [pagination]
);

app.listen();
