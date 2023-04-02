import { App } from './app';
import { LoggerService } from './logger/loggerService';
import { UsersController } from './users/usersController';
import { ExceptionFilter } from './errors/ExceptionFilter';

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(
        logger,
        new UsersController(logger),
        new ExceptionFilter(logger)
    );
    await app.init();
}

bootstrap();
