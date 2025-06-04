import { ConfigService } from './../config/config.service';
import { inject, injectable } from 'inversify';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interfase';
import { IUserRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configeServise: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDTO): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configeServise.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existUser = await this.usersRepository.find(email);

		if (existUser) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}
	async validateUser(dto: UserLoginDTO): Promise<boolean> {
		return true;
	}
}
