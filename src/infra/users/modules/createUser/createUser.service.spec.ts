import 'reflect-metadata';
import { User } from '../../../../shared/typeorm/entities/User.model';
import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';
import { GetUserService } from '../getUser/getUser.service';
import { CreateUserService } from './createUser.service';

describe('Create User - Service', () => {
	let usersRepository: UsersRepositoryInMemory;
	// let usersRepository: UsersRepository;
	let createUserService: CreateUserService;
	let getUserService: GetUserService;
	let userId = '';
	// preparing service to receive data to create a new user
	beforeAll(() => {
		// usersRepository = new UsersRepository(); // where the data will come from
		usersRepository = new UsersRepositoryInMemory();
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		getUserService = new GetUserService(usersRepository);
	});

	it('New User Creation', async () => {
		const userData: User = {
			user_name: 'andre',
			email: 'andre2@gmail.com',
			password: 'andre',
		}; // mock user
		const user = await createUserService.execute(userData);
		expect(user).toHaveProperty('id');
		expect(user.email).toBe('andre2@gmail.com');
		userId = user.id;
	});
	it('Creating same User', async () => {
		const userData: User = {
			user_name: 'andre',
			email: 'andre2@gmail.com',
			password: 'andre',
		};
		await expect(createUserService.execute(userData)).rejects.toEqual(new Error('User already exists!'));
	});
});
