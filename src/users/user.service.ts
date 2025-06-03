import { ConfigService } from './../config/config.service';
import { inject, injectable } from 'inversify';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interfase';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configeServise: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDTO): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configeServise.get('SALT');

		await newUser.setPassword(password, Number(salt));

		return null;
	}
	async validateUser(dto: UserLoginDTO): Promise<boolean> {
		return true;
	}
}
