import { IUserService } from './userServiceInterface';
import { UserRegisterDto } from './dto/userRegisterDto';
import { UserLoginDto } from './dto/userLoginDto';
import { User } from './userEntity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/configServiceIntreface';
import { IUsersRepository } from './usersRepositoryInterface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const excitedUser = await this.usersRepository.find(email);
		if (excitedUser) return null;

		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const excitedUser = await this.usersRepository.find(email);

		if (!excitedUser) return false;

		const newUser = new User(excitedUser.email, excitedUser.name, excitedUser.password);

		return newUser.comparePassword(password);
	}
}
