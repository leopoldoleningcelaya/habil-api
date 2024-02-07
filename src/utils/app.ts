import 'reflect-metadata';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, json, urlencoded } from 'express';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import HealthRoute from '@routes/health.route';
import { initLogger, logger, stream } from '@utils/logger';
const helmet = require('helmet'); // This is required to make the compiler happy

interface AppConfig {
  NODE_ENV: string;
  PORT: number | string;
  LOG_DIR: string;
  LOG_FORMAT: string;
  ORIGIN: string;
  CREDENTIALS: boolean;
  REQUEST_MAX_SIZE?: string;
}

export type Middleware = (req: Request, res: Response, next: () => void) => void;

export default class App {
  private rootPackageJson = require(path.join(process.cwd(), '/package.json'));
  public config: AppConfig;
  public app: Application;
  public env: string;
  public port: string | number;

  /**
   * Creates an instance of App.
   * @param config config object of type AppConfig
   * @param routes public route list
   * @param basepath public route basepath, it should not end with '/'
   * @param privateRoutes private route list
   * @param privateBasepath private route basepath, it should not end with '/'
   */
  constructor(
    config: AppConfig,
    routes: Routes[],
    basepath?: string,
    privateRoutes?: Routes[],
    privateBasepath?: string,
    additionalMiddlewares?: Middleware[]
  ) {
    this.config = config; // config is an object with the above properties
    this.app = express();
    this.env = this.config.NODE_ENV || 'development';
    this.port = this.config.PORT || 3000;

    routes.push(new HealthRoute());

    initLogger(this.config.LOG_DIR || 'src/logs'); // initialize logger
    this.initializeMiddlewares(additionalMiddlewares);
    this.initializeRoutes(routes, basepath || '/');
    this.initializeRoutes(privateRoutes || [], privateBasepath || '/');

    // eslint-disable-next-line import/no-named-as-default-member
    this.app.use('/images', express.static(path.join(process.cwd(), '../data/images'))); // serve static images

    this.initializeSwagger(basepath || '/');
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      const message_0 = ` ENV: ${this.env} `;
      const message_1 = ` 🚀 App listening on the port ${this.port} `;
      const message_2 = ` Current version ${this.rootPackageJson.version} `;
      const length_0 = message_0.length;
      const length_1 = message_1.length;
      const length_2 = message_2.length;
      const length = Math.max(length_0, length_1, length_2);

      let padding;
      logger.info('='.repeat(length));
      padding = '='.repeat((length - length_0) / 2);
      logger.info(`${padding + ((length - length_0) % 2 === 0 ? '' : '=')}${message_0}${padding}`);
      padding = '='.repeat((length - length_1) / 2);
      logger.info(`${padding + ((length - length_1) % 2 === 0 ? '' : '=')}${message_1}${padding}`);
      padding = '='.repeat((length - length_2) / 2);
      logger.info(`${padding + ((length - length_2) % 2 === 0 ? '' : '=')}${message_2}${padding}`);
      logger.info('='.repeat(length));
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares(additionalMiddlewares?: Middleware[]) {
    this.app.use(morgan(this.config.LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: this.config.ORIGIN, credentials: this.config.CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    if (this.config.REQUEST_MAX_SIZE) {
      this.app.use(json({ limit: this.config.REQUEST_MAX_SIZE }));
      this.app.use(urlencoded({ limit: this.config.REQUEST_MAX_SIZE, extended: true }));
    } else {
      this.app.use(json());
      this.app.use(urlencoded({ extended: true }));
    }
    this.app.use(cookieParser());
    additionalMiddlewares?.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeRoutes(routes: Routes[], basepath: string) {
    routes.forEach((route) => {
      const path = basepath + route.path;
      this.app.use(path, route.router);

      console.debug(route.constructor.name);
      route.router.stack.forEach((r) => {
        try {
          console.debug(`\t${r.route.stack[0].method.toUpperCase()} ${path}${r.route.path}`);
        } catch (_error) {
          // do nothing
        }
      });
    });
  }

  private initializeSwagger(basepath) {
    const options = {
      definition: {
        swagger: '2.0.',
        info: {
          title: this.rootPackageJson.name,
          version: this.rootPackageJson.version,
          description: this.rootPackageJson.description,
        },
      },
      apis: [
        path.resolve('swagger.yaml'),
        path.join(__dirname, './routes/*.route.js'),
        path.join(process.cwd(), '/src/routes/*.route.ts'),
      ],
    };

    const specs = swaggerJSDoc(options);
    this.app.use(
      `${basepath}/api-docs`,
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        swaggerOptions: {
          url: `${basepath}/api-docs.json`,
        },
      })
    );
    this.app.get(`${basepath}/api-docs.json`, (_req: Request, res: Response) => res.json(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
