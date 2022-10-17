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
		try {
			if (!Object.keys(request.body).length) {
				return response.status(404).json('email not provided');
			}
			const user = await this.getUserService.execute(request.body);
			return response.status(200).json(user);
		} catch (err) {
			return response.status(500).json({ err: err.message || err });
		}
	}
}
