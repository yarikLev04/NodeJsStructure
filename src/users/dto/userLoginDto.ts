import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Please enter valid email ' })
	email: string;
	@IsString({ message: 'Please enter password' })
	password: string;
}
