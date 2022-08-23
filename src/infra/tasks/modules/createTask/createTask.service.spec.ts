import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { TasksRepositoryInMemory } from '../../../repositories/fakes/TasksInMemory.repository';
import { CreateTaskService } from './createTask.service';
import { CreateUserService } from '../../../users/modules/createUser/createUser.service';
import { User } from '../../../../shared/typeorm/entities/User.model';
import { CrateTaskDto } from '../../dtos/createTask.dto';
describe('Task Creation - createTask Service', () => {
	let usersRepository: UsersRepositoryInMemory;
	let createUserService: CreateUserService;
	let tasksRepository: TasksRepositoryInMemory;
	let createTaskService: CreateTaskService;

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory(); // where the data will come from
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		tasksRepository = new TasksRepositoryInMemory();
		createTaskService = new CreateTaskService(tasksRepository, usersRepository);
	});

	it('New Task Creation', async () => {
		const userData: User = {
			user_name: 'andre',
			email: 'andre@gmail.com',
			password: 'andre',
		}; // mock user
		const taskInfo: CrateTaskDto = {
			description: 'description',
			completed: true,
		};
		const user = await createUserService.execute(userData);
		const task = await createTaskService.execute(taskInfo, user.email);
		expect(task).toHaveProperty('id');
		expect(task.user_info).toBe(user.id);
	});

	it('Creating Task without a valid user', async () => {
		const invalidEmail = 'blablablablabla@gmail.com';
		const taskInfo: CrateTaskDto = {
			description: 'description',
			completed: true,
		};
		await expect(createTaskService.execute(taskInfo, invalidEmail)).rejects.toEqual(new Error('User not found!'));
	});
});
