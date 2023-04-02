import express, { Express } from 'express';
import { Server } from 'http'
import { LoggerService } from './logger/loggerService';
import { UsersController } from './users/usersController';
import { ExceptionFilter } from './errors/ExceptionFilter';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    usersController: UsersController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: LoggerService,
                usersController: UsersController,
                exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8080;
        this.logger = logger;
        this.usersController = usersController;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.usersController.router)
    }

    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port)
        this.logger.log(`http://localhost:${this.port}`);
    }
}
