import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interfase';

@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}
	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.info('[PrismaService] успешное подключение');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[PrismaService] ошибка подключения' + error.message);
			}
		}
	}
	async disConnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
