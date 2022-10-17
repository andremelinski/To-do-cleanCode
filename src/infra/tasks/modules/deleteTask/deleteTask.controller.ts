import { delay, inject, injectable } from 'tsyringe';
import { IDeleteUserService } from '../../ITaskService';
import { DeleteTaskService } from './deleteTask.service';
import { Request, Response } from 'express';
@injectable()
export class DeleteTaskController {
	constructor(
		@inject(delay(() => DeleteTaskService))
		private readonly deleteTaskService: IDeleteUserService
	) {}

	async handle(request: Request, response: Response) {
		try {
			const taskDeleted = await this.deleteTaskService.execute(request.body);

			return response.status(200).json(taskDeleted);
		} catch (err) {
			console.log(err);
			return response.status(400).json({ err: err.message || err });
		}
	}
}
