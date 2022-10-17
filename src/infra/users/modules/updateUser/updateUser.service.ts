import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UpdateUserDto } from '../../dtos/updateUser.dto';
import { IUsersRepository, IUserRequest } from '../../../repositories/IUsersRepository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';
import { validate } from 'class-validator';

@injectable()
class UpdateUserService {
	constructor(
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(updateUserInfo: UpdateUserDto) {
		let { email, ...fieldsToUpdate } = updateUserInfo;
		const userExist = await this.usersRepository.exists(email);
		if (!userExist) throw new Error('User does not exist!');
		fieldsToUpdate = Object.fromEntries(Object.entries(fieldsToUpdate).filter(([_, v]) => v));

		if (!Object.keys(fieldsToUpdate).length) throw new Error('Fields to update not found!');

		const updateUserDto = UpdateUserDto.create(updateUserInfo);
		const errors = await validate(updateUserDto);

		if (errors.length) {
			const arrOfeErros = errors.reduce((acc, el) => [...acc, { field: el.property, constraints: el.constraints }], []);
			throw new Error(JSON.stringify(arrOfeErros));
		}

		return await this.usersRepository.update(email, fieldsToUpdate);
	}
}
export { UpdateUserService };
