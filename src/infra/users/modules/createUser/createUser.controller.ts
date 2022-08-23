import 'reflect-metadata';
import { CreateUserService } from './createUser.service';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { IUserService } from '../IUserService';
@singleton()
export class CreateUseController {
	constructor(
		@inject(delay(() => CreateUserService))
		private readonly createUser: IUserService
	) {}
	async handle(request: Request, response: Response) {
		const { username: user_name, email, password } = request.body;
		try {
			const user = await this.createUser.execute({ user_name, email, password });
			return response.status(200).json(user);
		} catch (err) {
			return response.status(400).json({ err: err.message || err });
		}
	}
}
