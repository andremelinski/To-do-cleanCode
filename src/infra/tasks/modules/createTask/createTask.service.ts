import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Task } from '../../../../shared/typeorm/entities/Task.model';
import { ITaskRepository } from '../../../repositories/ITasksRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { TasksRepository } from '../../../repositories/postgres/Tasks.repository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';
import { CrateTaskDto } from '../../dtos/createTask.dto';

@injectable()
export class CreateTaskService {
	constructor(
		@inject(TasksRepository)
		private readonly taskRepository: ITaskRepository,
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(taskInfo: CrateTaskDto, userEmail: string) {
		const userInfo = await this.usersRepository.getUserInfo(userEmail);
		if (!userInfo) throw new Error('User not found!');

		const taskNormalized = Task.create({ ...taskInfo, user_info: userInfo.id });
		const taskCreation = await this.taskRepository.create(taskNormalized);
		return taskCreation;
	}
}
