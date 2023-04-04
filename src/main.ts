import { App } from './app';
import { LoggerService } from './logger/loggerService';
import { UsersController } from './users/usersController';
import { ExceptionFilter } from './errors/exceptionFilter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/loggerInterface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exceptionFilterInterface';
import 'reflect-metadata';
import { IUserService } from './users/userServiceInterface';
import { UserService } from './users/userService';
import { IUsersController } from './users/usersControllerInterface';
import { ConfigService } from './config/configService';
import { IConfigService } from './config/configServiceIntreface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUsersController>(TYPES.UserController).to(UsersController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
