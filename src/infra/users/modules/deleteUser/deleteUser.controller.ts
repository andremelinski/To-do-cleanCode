import 'reflect-metadata';
import { Request, Response } from 'express';
import { delay, inject, singleton } from 'tsyringe';
import { IUserService } from '../IUserService';
import { DeleteUserService } from './deleteUser.service';
@singleton()
export class CreateUseController {
	constructor(
		@inject(delay(() => DeleteUserService))
		private readonly userInterface: IUserService
	) {}
	async handle(request: Request, response: Response) {
		const { userId: id } = request.params;
		if (!id) {
			return response.status(400).json({ err: 'id not provided' });
		}
		try {
			const user = await this.userInterface.executeDelete(id);
			return response.status(200).json(user);
		} catch (err) {
			return response.status(500).json({ err: err.message || err });
		}
	}
}
