import { UserRegisterDto } from './dto/userRegisterDto';
import { UserLoginDto } from './dto/userLoginDto';
import { UserModel } from '@prisma/client';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
