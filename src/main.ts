import { App } from './app';
import { LoggerService } from './logger/loggerService';
import { UsersController } from './users/usersController';
import { ExceptionFilter } from './errors/exceptionFilter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/loggerInterface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exceptionFilterInterface';
import 'reflect-metadata';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UsersController>(TYPES.UserController).to(UsersController);
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
