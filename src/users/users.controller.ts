import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interfase';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { HTTPError } from '../errrors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDTO)],
			},
		]);
	}
	login(req: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction) {
		console.log(req.body);
		this.ok(res, 'login');
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
