import { config } from 'dotenv';
import { initLogger, logger } from '@utils/logger';

export function initConfig() {
  const environment: string = process.env.NODE_ENV || 'development';
  config({ path: `.env.${environment}.local` });
  config({ path: `.env.${environment}` });
  config({ path: '.env' });
  initLogger(process.env.LOG_DIR || 'src/logs');
}

export function getEnvironmentInteger(key: string, defaultValue?: number): number {
  const value = parseInt(process.env[key], 10);
  if (isNaN(value)) {
    if (!defaultValue) {
      logger.error(`Environment variable ${key} is not a number and no default value was set`);
      throw new Error(`Environment variable ${key} is not a number and no default value was set`);
    }
    logger.warn(`Environment variable ${key} is not a number, using default value ${defaultValue}`);
    return defaultValue;
  } else {
    return value;
  }
}

export function getEnvironmentBoolean(key: string, defaultValue?: boolean): boolean {
  let value: string = process.env[key];
  if (typeof value === 'string') value = value.toLowerCase().trim();
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    if (defaultValue === undefined) {
      logger.error(`Environment variable ${key} is not a boolean and no default value was set`);
      throw new Error(`Environment variable ${key} is not a boolean and no default value was set`);
    }
    logger.warn(
      `Environment variable ${key} is not a boolean, using default value ${defaultValue}`
    );
    return defaultValue;
  }
}

export function getEnvironmentString(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value) {
    if (!defaultValue) {
      logger.error(`Environment variable ${key} is not set and no default value was set`);
      throw new Error(`Environment variable ${key} is not set and no default value was set`);
    }
    logger.warn(
      `Environment variable ${key} is not an object, using default value ${defaultValue}`
    );
    return defaultValue;
  } else {
    return value;
  }
}

export function getEnvironmentObject(key: string, defaultValue?: any): any {
  const value = process.env[key];
  if (!value) {
    if (!defaultValue) {
      logger.error(`Environment variable ${key} is not set and no default value was set`);
      throw new Error(`Environment variable ${key} is not set and no default value was set`);
    }
    logger.warn(
      `Environment variable ${key} is not an object, using default value ${defaultValue}`
    );
    return defaultValue;
  } else {
    return JSON.parse(value);
  }
}
