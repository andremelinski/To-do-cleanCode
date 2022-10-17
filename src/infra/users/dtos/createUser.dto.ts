import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CrateUserDto {
	@IsString()
	@IsNotEmpty()
	user_name: string;
	@IsNotEmpty()
	@IsEmail()
	email: string;
	@IsString()
	@IsNotEmpty()
	@MinLength(4, {
		message: 'Password is too short. Minimal length is $constraint1 characters',
	})
	password: string;

	constructor({ user_name, email, password }: CrateUserDto) {
		return Object.assign(this, { user_name, email, password });
	}

	static create({ user_name, email, password }: CrateUserDto) {
		return new CrateUserDto({ user_name, email, password });
	}
}
