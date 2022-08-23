import 'reflect-metadata';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { IGetTaskByUserService } from '../../ITaskService';
import { GetTaskByUserService } from './getTaskByUser.service';

@singleton()
export class GetTaskByUserController {
	constructor(
		@inject(delay(() => GetTaskByUserService))
		private getTask: IGetTaskByUserService
	) {}
	async handle(request: Request, response: Response) {
		const { userId } = request.params;
		if (!userId) return response.status(400).json({ err: 'user id not passed' });
		try {
			const task = await this.getTask.execute(userId);
			return response.status(200).json(task);
		} catch (err) {
			console.log(err);
			return response.status(400).json({ err: err.message || err });
		}
	}
}
