import { Router, Response } from 'express';
import { IControllerRoute } from './route.interface';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interfase';
import 'reflect-metadata';
@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: ILogger) {
        this._router = Router();
    }
    get router() {
        return this._router;
    }
    public send<T>(res: Response, code: number, message: T) {
        res.type('aplication/json');
        return res.status(code).json(message);
    }
    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
    }
    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const router of routes) {
            this.logger.info(`[${router.method}] ${router.path}`);
            const middleware = router.middlewares?.map(m=>m.execute.bind(m))
            const handler = router.func.bind(this);
            const pipeline = middleware? [...middleware,handler] : handler
            this._router[router.method](router.path, pipeline);
        }
    }
}
