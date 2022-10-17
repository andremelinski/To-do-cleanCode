import 'reflect-metadata';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import { User } from '../../../../shared/typeorm/entities/User.model';
import { CrateUserDto } from '../../dtos/createUser.dto';
import { IUsersRepository, IUserRequest } from '../../../repositories/IUsersRepository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';

@injectable()
class CreateUserService {
	constructor(
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(userInfo: CrateUserDto) {
		const newUserDto = CrateUserDto.create(userInfo);
		const errors = await validate(newUserDto);

		if (errors.length) {
			const arrOfeErros = errors.reduce((acc, el) => [...acc, { field: el.property, constraints: el.constraints }], []);
			throw new Error(JSON.stringify(arrOfeErros));
		}
		const userCreate = User.create(newUserDto);

		const { email } = userCreate;
		const userAlreadyExists = await this.usersRepository.exists(email);
		if (userAlreadyExists) {
			throw new Error('User already exists!');
		}
		return await this.usersRepository.create(userCreate);
	}
}
export { CreateUserService };
