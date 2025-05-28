import { Router, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
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
            const handler = router.func.bind(this);
            this._router[router.method](router.path, handler);
        }
    }
}
