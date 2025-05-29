import { Container } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errrors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interfase';
import { TYPES } from './types';
import { IExeptionFilter } from './errrors/exeption.filter.interface';

const container = new Container();
container.bind<ILogger>(TYPES.ILogger).to(LoggerService);
container.bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
container.bind<App>(TYPES.Application).to(App);
container.bind<UsersController>(TYPES.UserController).to(UsersController);

const app = container.get<App>(TYPES.Application);
app.init();
export { app, container };
