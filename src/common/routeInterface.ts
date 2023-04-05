import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middlewareInterface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'post' | 'get' | 'delete' | 'put' | 'patch'>;
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
