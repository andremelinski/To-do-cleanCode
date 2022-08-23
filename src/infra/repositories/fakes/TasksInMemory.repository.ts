import { Task } from '../../../shared/typeorm/entities/Task.model';
import { ITaskRepository } from '../ITasksRepository';
import { v4 as uuid } from 'uuid';
export class TasksRepositoryInMemory implements ITaskRepository {
	private tasks: Task[] = [];

	async create(taskInfo: Task): Promise<Task> {
		Object.assign(taskInfo, {
			id: uuid(),
		});
		this.tasks.push(taskInfo);
		console.log(this.tasks);
		return taskInfo;
	}

	// async getTaskInfo(id: string): Promise<Task> {
	// 	return this.tasks.find((task) => task.id === id);
	// }

	async getTaskByUser(userId: string): Promise<Task[]> {
		return this.tasks.filter((task) => task.user_info === userId);
	}

	// async update(id: string, updateInfo: any): Promise<any> {
	// 	this.tasks.map((task) => {
	// 		if (task.id === id) {
	// 			task.description = updateInfo.description || task.description;
	// 			task.completed = updateInfo.completed || task.completed;
	// 		} else {
	// 			task;
	// 		}
	// 	});
	// 	return this.tasks.find((task) => task.id === id);
	// }
}
