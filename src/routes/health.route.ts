import path from 'path';
import { NextFunction, Request, Response } from 'express';
import Route from '@routes/index';

const packageJson = require(path.join(process.cwd(), 'package.json'));

const version = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ service: packageJson.name, version: packageJson.version });
  } catch (error) {
    next(error);
  }
};

class HealthRoute extends Route {
  public path = '/health';

  protected initializeRoutes() {
    /**
     * @openapi
     * /health/version:
     *   get:
     *     description: Get service version and name
     *     responses:
     *       200:
     *         description: Returns an object with service version and name
     *     operationId: getVersion
     */
    this.router.get('/version', version);
  }
}

export default HealthRoute;
