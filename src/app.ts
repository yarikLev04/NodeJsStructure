import express, { Express, json } from 'express';
import { Server } from 'http';
import { UsersController } from './users/usersController';
import { ExceptionFilter } from './errors/exceptionFilter';
import { ILogger } from './logger/loggerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { ConfigService } from './config/configService';
import { IConfigService } from './config/configServiceIntreface';
import { IExceptionFilter } from './errors/exceptionFilterInterface';
import { PrismaService } from './database/prismaService';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private usersController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8080;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`http://localhost:${this.port}`);
	}
}
