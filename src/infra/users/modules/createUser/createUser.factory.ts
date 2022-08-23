import { UsersRepositoryInMemory } from '../../../repositories/fakes/UsersInMemory.repository';
import { CreateUserService } from './createUser.service';
import { CreateUseController } from './createUser.controller';

// const dataBaseRepository = new UsersRepositoryInMemory();
// const userCreated = new CreateUserService(dataBaseRepository);
// const createUserController = new CreateUseController(userCreated);
// Once we're using injection and dependencies, factory is not necessary anymore
// export { userCreated, createUserController };
