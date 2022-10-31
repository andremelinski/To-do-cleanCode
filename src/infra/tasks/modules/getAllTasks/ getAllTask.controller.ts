import 'reflect-metadata';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { IGetTaskByUserService } from '../../ITaskService';
import { GetTaskByUserService } from '../getTaskByUser/getTaskByUser.service';

@singleton()
export class GetAllTaskController {
	constructor(
		@inject(delay(() => GetTaskByUserService))
		private getTask: IGetTaskByUserService
	) {}
	async handle(request: Request, response: Response) {
		const { userId } = request.params;
		try {
			const task = await this.getTask.execute(userId);
			return response.status(200).json(task);
		} catch (err) {
			console.log(err);
			return response.status(400).json({ err: err.message || err });
		}
	}
}
