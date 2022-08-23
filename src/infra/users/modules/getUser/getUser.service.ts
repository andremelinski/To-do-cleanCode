import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { GetUserDto } from '../../dtos/getUser.dto';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';

@injectable()
class GetUserService {
	constructor(
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute({ email }: GetUserDto) {
		const userExist = await this.usersRepository.exists(email);
		if (!userExist) throw new Error('User does not exist!');
		return await this.usersRepository.getUserInfo(email);
	}
}
export { GetUserService };
