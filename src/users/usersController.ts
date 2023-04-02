import { BaseController } from '../common/baseController';
import { NextFunction, Request, Response } from 'express';
import { ILogger } from '../logger/loggerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUsersController } from './usersControllerInterface';

@injectable()
export class UsersController extends BaseController implements IUsersController  {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService)
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login')
        // next(new HttpError(401, 'Error auth'))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
}
