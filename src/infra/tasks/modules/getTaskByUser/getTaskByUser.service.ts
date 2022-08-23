import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../../repositories/ITasksRepository';
import { TasksRepository } from '../../../repositories/postgres/Tasks.repository';

@injectable()
export class GetTaskByUserService {
	constructor(
		@inject(TasksRepository)
		private readonly taskRepository: ITaskRepository
	) {}

	async execute(userId: string) {
		return await this.taskRepository.getTaskByUser(userId);
	}
}
