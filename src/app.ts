import express, { Express } from 'express';
import { Server } from 'http'; // Импортируем Server для типизации

import { LoggerService } from './logger/logger.service'; // Убедитесь, что путь к файлу корректен
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errrors/exeption.filter';

export class App {
    port: number;
    app: Express;
    server: Server | undefined; // Добавляем свойство для хранения экземпляра сервера
    logger: LoggerService; // Добавляем свойство для логгера
    userController: UsersController;
    exeptionFilter: ExeptionFilter;
    // Конструктор теперь принимает экземпляр LoggerService
    constructor(
        logger: LoggerService,
        userController: UsersController,
        exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 5000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
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
        this.useRoutes(); //

        // Запускаем Express-сервер и сохраняем его экземпляр
        this.server = this.app.listen(this.port, () => {
            this.logger.info(`Server started on port ${this.port}`);
        });

        return this.server;
    }
}
