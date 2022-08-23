import { User } from '../../../shared/typeorm/entities/User.model';

interface IUserService {
	execute(userInfo): Promise<User>;
	executeDelete(id: string): Promise<string>;
}

export { IUserService };
