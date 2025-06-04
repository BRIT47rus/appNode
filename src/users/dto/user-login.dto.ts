import { IsEmail, IsString } from 'class-validator';

export class UserLoginDTO {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string = '';
	@IsString()
	password: string = '';
}
