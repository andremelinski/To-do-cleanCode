import { Task } from '../../shared/typeorm/entities/Task.model';

interface ITaskService {
	execute(taskInfo, email: string): Promise<Task>;
}

interface IGetTaskByUserService {
	execute(userId: string): Promise<Task[]>;
}

export { ITaskService, IGetTaskByUserService };
