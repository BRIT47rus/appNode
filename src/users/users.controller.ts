import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interfase';
@injectable()
export class UsersController extends BaseController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login,
            },
            { path: '/register', method: 'post', func: this.register },
        ]);
    }
    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}
