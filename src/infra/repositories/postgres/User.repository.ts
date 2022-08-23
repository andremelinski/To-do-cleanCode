import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { User } from '../../../shared/typeorm/entities/User.model';
import { IUsersRepository } from '../IUsersRepository';
import { AppDataSource } from './data-source';

export class UsersRepository implements IUsersRepository {
	private userRepository = AppDataSource.getRepository(User);

	async create(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}

	async exists(email: string): Promise<boolean> {
		const user = await this.userRepository.findOneBy({
			email,
		});
		return user ? true : false;
	}

	async getUserInfo(email: string): Promise<User> {
		return await this.userRepository.findOneBy({
			email,
		});
	}

	async findUserById(id: string): Promise<boolean> {
		const user = await this.userRepository.findOneBy({
			id,
		});
		return user ? true : false;
	}

	async update(email: string, updateInfo: any): Promise<User> {
		const currentUserInfo = await this.getUserInfo(email);

		return await this.userRepository.save({
			...currentUserInfo,
			...updateInfo,
		});
	}

	async deleteUserById(id: string) {
		return await this.userRepository.delete({ id });
	}
}
