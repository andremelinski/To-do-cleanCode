import { Task } from '../../../shared/typeorm/entities/Task.model';
import { ITaskRepository } from '../ITasksRepository';
import { AppDataSource } from './data-source';
export class TasksRepository implements ITaskRepository {
	private taskRepository = AppDataSource.getRepository(Task);

	async create(taskInfo: Task): Promise<Task> {
		return await this.taskRepository.save(taskInfo);
	}

	async getTaskInfo(id: string): Promise<Task> {
		return await this.taskRepository.findOneByOrFail({ id });
	}

	async getTaskByUser(userId: string): Promise<Task[]> {
		return await this.taskRepository.findBy({ user_info: userId });
	}
	// async update(id: string, updateInfo: any): Promise<Task> {
	// 	const currentTaskInfo = await this.getTaskInfo(id);
	// 	return await this.taskRepository.save({
	// 		...currentTaskInfo,
	// 		...updateInfo,
	// 	});
	// }

	async deleteTaskById(id: string) {
		return await this.taskRepository.delete({ id });
	}
}
