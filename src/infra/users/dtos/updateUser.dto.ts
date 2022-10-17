import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
	@IsEmail()
	email: string;
	@IsOptional()
	@IsString()
	user_name?: string;
	@IsOptional()
	@IsString()
	@MinLength(4)
	password?: string;

	constructor(updateUserInfo: UpdateUserDto) {
		return Object.assign(this, { email: updateUserInfo?.email, user_name: updateUserInfo?.user_name, password: updateUserInfo?.password });
	}

	static create(updateUserInfo: UpdateUserDto) {
		return new UpdateUserDto({ email: updateUserInfo?.email, user_name: updateUserInfo?.user_name, password: updateUserInfo?.password });
	}
}
