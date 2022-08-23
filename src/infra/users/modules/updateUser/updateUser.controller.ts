import 'reflect-metadata';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { UpdateUserService } from './updateUser.service';
import { IUserService } from '../IUserService';
@singleton()
export class UpdateUserController {
	constructor(
		@inject(delay(() => UpdateUserService))
		private updateUserService: IUserService
	) {}

	async handle(request: Request, response: Response) {
		const { email, username: user_name, password } = request.body;
		try {
			const user = await this.updateUserService.execute({ email, user_name, password });
			return response.status(200).json(user);
		} catch (err) {
			return response.status(400).json({ err: err.message || err });
		}
	}
}
