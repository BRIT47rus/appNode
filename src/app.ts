import express, { Express } from 'express';
import { Server } from 'http'; // Импортируем Server для типизации
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interfase';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExeptionFilter } from './errrors/exeption.filter.interface';
import { json } from 'body-parser';
('body-parser');
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interfase';
import { PrismaService } from './database/prisma.service';
@injectable()
export class App {
	port: number;
	app: Express;
	server: Server | undefined; // Добавляем свойство для хранения экземпляра сервера

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserController) private userController: UsersController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.IConfigService) private configeService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 5000;
	}
	useMiddleware(): void {
		this.app.use(json());
	}
	// Метод для регистрации маршрутов
	useRoutes() {
		this.app.use('/users', this.userController.router);
	}
	useExeptionFilter() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	// Метод инициализации приложения
	public async init() {
		this.useMiddleware();
		this.useRoutes(); //
		this.useExeptionFilter();
		await this.prismaService.connect();
		// Запускаем Express-сервер и сохраняем его экземпляр
		this.server = this.app.listen(this.port, () => {
			this.loggerService.info(`Server started on port ${this.port}`);
		});

		return this.server;
	}
}
