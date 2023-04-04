import { IUserService } from './userServiceInterface';
import { UserRegisterDto } from './dto/userRegisterDto';
import { UserLoginDto } from './dto/userLoginDto';
import { User } from './userEntity';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
