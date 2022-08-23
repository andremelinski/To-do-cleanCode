import { User } from '../../shared/typeorm/entities/User.model';

interface IUsersRepository {
	create(user: User): Promise<User>;
	exists(email: string): Promise<boolean>;
	findUserById(id: string): Promise<boolean>;
	update(email: string, fieldsToUpdate: any): Promise<User>;
	getUserInfo(email: string): Promise<User>;
	deleteUserById(id: string): Promise<any>;
}

interface IUserRequest {
	id?: string;
	username: string;
	email: string;
	password: string;
}

export { IUsersRepository, IUserRequest };
