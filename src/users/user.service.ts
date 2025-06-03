import { injectable } from "inversify";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserRegisterDTO } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./user.service.interface";

@injectable
export class UserService implements IUserService{
    async createUser({email,name,password}: UserRegisterDTO): Promise<User | null> {
    		const newUser = new User(email, name);
		await newUser.setPassword(password);
        
        return null;
    }
   async validateUser(dto: UserLoginDTO): Promise<boolean> {
        return true
    }
}