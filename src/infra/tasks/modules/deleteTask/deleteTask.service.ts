import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../../repositories/ITasksRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { TasksRepository } from '../../../repositories/postgres/Tasks.repository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';
import { DeleteTaskDto } from '../../dtos/deleteTask.dto';

@injectable()
export class DeleteTaskService {
	constructor(
		@inject(TasksRepository)
		private readonly tasksRepository: ITaskRepository,

		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(taskInfo: DeleteTaskDto) {
		const errors = await validate(DeleteTaskDto.create(taskInfo));

		if (errors.length) {
			const arrOfeErros = errors.reduce((acc, el) => [...acc, { field: el.property, constraints: el.constraints }], []);
			throw new Error(JSON.stringify(arrOfeErros));
		}
		const { id: taskId, userId } = taskInfo;
		const userInfo = await this.usersRepository.findUserById(userId);
		if (!userInfo) throw new Error('User not found!');
		const aqui = await this.tasksRepository.deleteTaskById(taskId);
		return 'deleted';
	}
}
