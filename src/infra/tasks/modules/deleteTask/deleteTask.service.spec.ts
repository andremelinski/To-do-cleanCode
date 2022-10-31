import { TasksRepositoryInMemory } from '../../../repositories/fakes/TasksInMemory.repository';
import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { CrateUserDto } from '../../../users/dtos/createUser.dto';
import { CreateUserService } from '../../../users/modules/createUser/createUser.service';
import { CrateTaskDto } from '../../dtos/createTask.dto';
import { CreateTaskService } from '../createTask/createTask.service';
import { GetTaskByUserService } from '../getTaskByUser/getTaskByUser.service';
import { DeleteTaskService } from './deleteTask.service';

describe('Delete Task', () => {
	let usersRepository: UsersRepositoryInMemory;
	let createUserService: CreateUserService;
	let tasksRepository: TasksRepositoryInMemory;
	let createTaskService: CreateTaskService;
	let getTaskByUserService: GetTaskByUserService;
	let deleteTaskService: DeleteTaskService;

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory(); // where the data will come from
		createUserService = new CreateUserService(usersRepository); // where the data is created is a constructor paremeter that must follow IUsersRepository
		tasksRepository = new TasksRepositoryInMemory();
		createTaskService = new CreateTaskService(tasksRepository, usersRepository);
		deleteTaskService = new DeleteTaskService(tasksRepository, usersRepository);
		getTaskByUserService = new GetTaskByUserService(tasksRepository, usersRepository);
	});

	it('Delete Task', async () => {
		const userData: CrateUserDto = {
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
		const taskDeleted = await deleteTaskService.execute({ id: task.id, userId: user.id });
		expect(taskDeleted).toEqual('deleted');
	});
});
