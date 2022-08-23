import 'reflect-metadata';
import { User } from '../../../../shared/typeorm/entities/User.model';
import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { CreateUserService } from '../createUser/createUser.service';
import { GetUserService } from '../getUser/getUser.service';
import { DeleteUserService } from './deleteUser.service';

describe('Create User - Service', () => {
	let usersRepository: UsersRepositoryInMemory;
	let createUserService: CreateUserService;
	let getUserService: GetUserService;
	let userCreated: User;
	let deleteUserService: DeleteUserService;
	// preparing service to receive data to create a new user
	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		getUserService = new GetUserService(usersRepository);
		deleteUserService = new DeleteUserService(usersRepository);
	});

	it('Deleting User after creation', async () => {
		const userData: User = {
			user_name: 'andre',
			email: 'andre2@gmail.com',
			password: 'andre',
		}; // mock user
		userCreated = await createUserService.execute(userData);
		expect(userCreated).toHaveProperty('id');
		expect(userCreated.email).toBe('andre2@gmail.com');
		const firstDeletion = await deleteUserService.executeDelete(userCreated.id);
		expect(firstDeletion).toHaveProperty('message');
		await expect(deleteUserService.executeDelete(userCreated.id)).rejects.toEqual(new Error('User does not exist!'));
	});
});
