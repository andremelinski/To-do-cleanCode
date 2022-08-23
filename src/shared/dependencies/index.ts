import { container } from 'tsyringe';
import { CreateUserService } from '../../infra/users/modules/createUser/createUser.service';
import { UsersRepositoryInMemory } from '../../infra/repositories/fakes/UsersInMemory.repository';
// import { ICreateUsersRepository } from '../../infra/users/repositories/IUsersRepository';

container.registerSingleton('UsersRepository', UsersRepositoryInMemory);

container.registerSingleton<CreateUserService>('CreateUserService', CreateUserService);
