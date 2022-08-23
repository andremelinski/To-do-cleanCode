import 'reflect-metadata';
import { User } from '../../../../shared/typeorm/entities/User.model';
import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';
import { CreateUserService } from '../createUser/createUser.service';
import { GetUserService } from './getUser.service';

// @injectable()
describe('Updating User data', () => {
	// let usersRepository: UsersRepository;
	let usersRepository: UsersRepositoryInMemory;
	let createUserService: CreateUserService;
	let getUserService: GetUserService;
	// preparing service to receive data to create a new user
	beforeAll(() => {
		// usersRepository = new UsersRepository(); // where the data will come from
		usersRepository = new UsersRepositoryInMemory();
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		getUserService = new GetUserService(usersRepository);
	});

	it('Get User Information', async () => {
		const userData: User = {
			user_name: 'andre',
			email: 'andre2@gmail.com',
			password: 'andre',
		};
		const userCreation = await createUserService.execute(userData);
		const getUserInfo = await getUserService.execute(userData);
		expect(getUserInfo).toHaveProperty('id');
		expect(userCreation.user_name).toBe('andre');
		// await usersRepository.deleteUserById(getUserInfo.id);
		// expect(await getUserService.execute(userData)).rejects.toEqual(new Error('User does not exist!')); // must fail for user deleted
	});
});
