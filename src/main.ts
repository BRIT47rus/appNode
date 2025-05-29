import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errrors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interfase';
import { TYPES } from './types';
import { IExeptionFilter } from './errrors/exeption.filter.interface';

const appContainerModule = new ContainerModule((options) => {
    const { bind } = options;
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
    bind<App>(TYPES.Application).to(App);
    bind<UsersController>(TYPES.UserController).to(UsersController);
});
const bootstrap = () => {
    const container = new Container();
    container.load(appContainerModule);
    const app = container.get<App>(TYPES.Application);
    app.init();
    return { app, container };
};

export const { app, container } = bootstrap();
