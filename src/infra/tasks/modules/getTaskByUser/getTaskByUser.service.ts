import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../../repositories/ITasksRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { TasksRepository } from '../../../repositories/postgres/Tasks.repository';
import { UsersRepository } from '../../../repositories/postgres/User.repository';

@injectable()
export class GetTaskByUserService {
	constructor(
		@inject(TasksRepository)
		private readonly taskRepository: ITaskRepository,
		@inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(userId: string) {
		if (!(await this.usersRepository.findUserById(userId))) {
			throw new Error('user not found');
		}
		return await this.taskRepository.getTaskByUser(userId);
	}
}
