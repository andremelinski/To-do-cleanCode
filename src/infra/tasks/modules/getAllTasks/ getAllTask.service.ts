import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from '../../../repositories/ITasksRepository';
import { TasksRepository } from '../../../repositories/postgres/Tasks.repository';

@injectable()
export class GetAllTaskService {
	constructor(
		@inject(TasksRepository)
		private readonly taskRepository: ITaskRepository
	) {}

	async execute() {
		return await this.taskRepository.getAllTasks();
	}
}
