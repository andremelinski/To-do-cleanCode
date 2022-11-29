import { Task } from '../../shared/typeorm/entities/Task.model';

interface ITaskService {
	execute(taskInfo: { description: string; completed: boolean }, email: string): Promise<Task>;
}

interface IGetTaskByUserService {
	execute(userId: string): Promise<Task[]>;
}

interface IDeleteUserService {
	execute(request: any): Promise<Task>;
}

export { ITaskService, IGetTaskByUserService, IDeleteUserService };
