import {
  getEnvironmentBoolean,
  getEnvironmentInteger,
  getEnvironmentObject,
  initConfig,
} from '@utils/config';

initConfig();

export const CREDENTIALS = getEnvironmentBoolean('CREDENTIALS', false);
export const KEYCLOAK_CONFIG = getEnvironmentObject('KEYCLOAK_CONFIG');
export const KEYCLOAK_ADMIN_CONFIG = getEnvironmentObject('KEYCLOAK_ADMIN_CONFIG');
export const DB_PORT = getEnvironmentInteger('DB_PORT');
export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;
