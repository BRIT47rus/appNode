import { Request, Response, NextFunction } from 'express';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interfase';
import 'reflect-metadata';
@injectable()
export class ExeptionFilter implements IExeptionFilter {
    constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
    catch(
        err: Error | HTTPError,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (err instanceof HTTPError) {
            this.logger.error(
                `[${err.context}] Ошибка ${err.statusCode}] : ${err.message}]`
            );
            res.status(err.statusCode).send({ err: err.message });
        } else {
            this.logger.error(`[${err.message}]`);
            res.status(500).send({ err: err.message });
        }
    }
}
