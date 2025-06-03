import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errrors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interfase';
import { TYPES } from './types';
import { IExeptionFilter } from './errrors/exeption.filter.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { IConfigService } from './config/config.service.interfase';
import { ConfigService } from './config/config.service';

const appContainerModule = new ContainerModule((options) => {
	const { bind } = options;
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<UsersController>(TYPES.UserController).to(UsersController);
	bind<App>(TYPES.Application).to(App);
});
const bootstrap = () => {
	const container = new Container();
	container.load(appContainerModule);
	const app = container.get<App>(TYPES.Application);
	app.init();
	return { app, container };
};

export const { app, container } = bootstrap();
