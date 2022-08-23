import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UpdateUserDto } from '../../dtos/updateUser.dto';
import { IUsersRepository, IUserRequest } from '../../../repositories/IUsersRepository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';

@injectable()
class UpdateUserService {
	constructor(
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute({ email, ...fieldsToUpdate }: UpdateUserDto) {
		const userExist = await this.usersRepository.exists(email);
		if (!userExist) throw new Error('User does not exist!');

		fieldsToUpdate = Object.fromEntries(Object.entries(fieldsToUpdate).filter(([_, v]) => v));
		if (!Object.keys(fieldsToUpdate).length) throw new Error('Fields to update not found!');

		return await this.usersRepository.update(email, fieldsToUpdate);
	}
}
export { UpdateUserService };
