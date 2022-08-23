import { User } from '../../../../shared/typeorm/entities/User.model';
import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';
import { CreateUserService } from '../createUser/createUser.service';
import { GetUserService } from '../getUser/getUser.service';
import { UpdateUserService } from './updateUser.service';

describe('Updating User data', () => {
	let usersRepository: UsersRepositoryInMemory;
	let createUserService: CreateUserService;
	let updateUserService: UpdateUserService;
	let getUserService: GetUserService;
	// preparing service to receive data to create a new user
	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory(); // where the data will come from
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		updateUserService = new UpdateUserService(usersRepository);
		getUserService = new GetUserService(usersRepository);
	});

	it('user_name update', async () => {
		const userData: User = {
			user_name: 'andre',
			email: 'andre2@gmail.com',
			password: 'andre',
		}; // mock user
		const user = await createUserService.execute(userData);
		const updateUser = {
			user_name: 'andre2',
			email: 'andre2@gmail.com',
		};

		const userWithNewInformation = await updateUserService.execute(updateUser);
		expect(userWithNewInformation).toHaveProperty('id');
		expect(user.user_name).toBe('andre2');
		// await usersRepository.deleteUserById(user.id);
		// expect(await getUserService.execute(userData)).rejects.toEqual(new Error('User does not exist!')); // must fail for user deleted
	});
	it('Update user without email been registered', async () => {
		const updateUser = {
			user_name: 'andre2',
			email: 'andre159@gmail.com',
		};
		await expect(updateUserService.execute(updateUser)).rejects.toEqual(new Error('User does not exist!'));
	});
});
