import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { TYPES } from '../types';
import { ILogger } from '../logger/loggerInterface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Db connected successfully');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] Error when trying connect to Db' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
