import { NextFunction, Router, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
    middlewares?:IMiddleware[]
}
