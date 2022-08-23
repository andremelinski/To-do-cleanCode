import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';

@injectable()
class DeleteUserService {
	constructor(
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async executeDelete(id: string): Promise<any> {
		const userExist = await this.usersRepository.findUserById(id);
		if (!userExist) {
			throw new Error('User does not exist!');
		}
		const aqui = await this.usersRepository.deleteUserById(id);
		console.log({ aqui });
		return { message: 'deleted' };
	}
}

export { DeleteUserService };
