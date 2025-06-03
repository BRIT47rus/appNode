import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interfase';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import {User} from './user.entity'

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
	login(req: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction) {
		console.log(req.body);
		this.ok(res, 'login');
	}
	async register({ body }: Request<{}, {}, UserRegisterDTO>, res: Response, next: NextFunction):Promise<void> {
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		this.ok(res, newUser);
	}
}
