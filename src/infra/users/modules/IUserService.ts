import { User } from '../../../shared/typeorm/entities/User.model';

interface IUserService {
	execute(userInfo: { user_name: string; email: string; password: string }): Promise<User>;
	executeDelete(id: string): Promise<string>;
}

export { IUserService };
