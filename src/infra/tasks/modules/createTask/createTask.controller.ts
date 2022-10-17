import 'reflect-metadata';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { CreateTaskService } from './createTask.service';
import { ITaskService } from '../../ITaskService';

@singleton()
export class CreateTaskController {
	constructor(
		@inject(delay(() => CreateTaskService))
		private createTask: ITaskService
	) {}
	async handle(request: Request, response: Response) {
		const { description, completed = false, userEmail } = request.body;
		const taskInfo = { description, completed };
		try {
			const task = await this.createTask.execute(taskInfo, userEmail);
			return response.status(200).json(task);
		} catch (err) {
			console.log(err);
			return response.status(400).json({ err: err.message || err });
		}
	}
}
