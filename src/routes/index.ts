import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

abstract class Route implements Routes {
  public abstract path: string;
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  protected initializeMiddlewares(): void {
    // override this method to add middlewares
  }

  protected abstract initializeRoutes(): void;
}

export default Route;
