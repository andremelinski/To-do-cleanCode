import 'reflect-metadata';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { GetUserService } from './getUser.service';
import { IUserService } from '../IUserService';

@singleton()
export class GetUserController {
	constructor(
		@inject(delay(() => GetUserService))
		private getUserService: IUserService
	) {}

	async handle(request: Request, response: Response) {
		const userInfo = request.body;
		try {
			const user = await this.getUserService.execute(userInfo);
			return response.status(200).json(user);
		} catch (err) {
			return response.status(400).json({ err: err.message || err });
		}
	}
}
