import { User } from '../../../shared/typeorm/entities/User.model';
import { IUsersRepository } from '../IUsersRepository';
import { v4 as uuid } from 'uuid';

export class UsersRepositoryInMemory implements IUsersRepository {
	private users: User[] = [];

	async create(user: User): Promise<User> {
		Object.assign(user, {
			id: uuid(),
		});
		this.users.push(user);
		return user;
	}

	async exists(email: string): Promise<boolean> {
		return this.users.some((user) => user.email === email);
	}

	async getUserInfo(email: string): Promise<User> {
		return this.users.find((user) => user.email === email);
	}

	async findUserById(id: string): Promise<boolean> {
		return this.users.some((user) => user.id === id);
	}

	async update(email: string, updateInfo: any): Promise<any> {
		this.users.map((user) => {
			if (user.email === email) {
				user.user_name = updateInfo.user_name || user.user_name;
				user.password = updateInfo.password || user.password;
			} else {
				user;
			}
		});
		return this.users.find((user) => user.email === email);
	}

	async deleteUserById(id: string) {
		this.users = this.users.filter((obj) => obj.id !== id);
		return this.users;
	}
}
