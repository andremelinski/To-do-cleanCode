import { User } from '../../../../shared/typeorm/entities/User.model';
import { TasksRepositoryInMemory } from '../../../repositories/fakes/TasksInMemory.repository';
import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { CreateUserService } from '../../../users/modules/createUser/createUser.service';
import { CrateTaskDto } from '../../dtos/createTask.dto';
import { CreateTaskService } from '../createTask/createTask.service';
import { GetTaskByUserService } from './getTaskByUser.service';

describe('Task Creation - createTask Service', () => {
	let usersRepository: UsersRepositoryInMemory;
	let createUserService: CreateUserService;
	let tasksRepository: TasksRepositoryInMemory;
	let createTaskService: CreateTaskService;
	let getTaskByUserService: GetTaskByUserService;

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory(); // where the data will come from
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		tasksRepository = new TasksRepositoryInMemory();
		createTaskService = new CreateTaskService(tasksRepository, usersRepository);
		getTaskByUserService = new GetTaskByUserService(tasksRepository, usersRepository);
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
		const tasksByUser = await getTaskByUserService.execute(user.id);
		expect(tasksByUser).toHaveLength(1);
	});
});
