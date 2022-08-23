import { Task } from '../../shared/typeorm/entities/Task.model';

interface ITaskRepository {
	create(task: Task): Promise<Task>;
	getTaskByUser(userId: string): Promise<Task[]>;
	// update(id: string, fieldsToUpdate: any): Promise<Task>;
	// getTaskInfo(id: string): Promise<Task>;
	// deleteTaskById(id: string): Promise<any>;
}

interface ITaskRequest {
	id?: string;
	description: string;
	completed: boolean;
	userId: string;
}

export { ITaskRepository, ITaskRequest };
