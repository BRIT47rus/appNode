import 'reflect-metadata';
import { IConfigService } from './../config/config.service.interfase';

import { Container } from 'inversify';
import { IUserRepository } from './users.repository.interface';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigeServMock: IConfigService = {
	get: jest.fn(),
};
const UserRepositoryMock: IUserRepository = {
	find: jest.fn(),
	create: jest.fn(),
};
const container = new Container();
let configService: IConfigService;
let usersRepository: IUserRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigeServMock);
	container.bind<IUserRepository>(TYPES.UsersRepository).toConstantValue(UserRepositoryMock);
	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUserRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});
let createdUser: UserModel | null;
describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await userService.createUser({
			email: 'v@v.ru',
			name: 'vladimir',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});
	it('validate user success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: 'v@v.ru',
			password: '1',
		});
		expect(res).toBeTruthy();
	});
	it('wrong user password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: 'v@v.ru',
			password: '2',
		});
		expect(res).toBeFalsy();
	});
	it('wrong user ', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await userService.validateUser({
			email: 'v@v.ru',
			password: '2',
		});
		expect(res).toBeFalsy();
	});
});
