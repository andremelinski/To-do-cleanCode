import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateUseController } from '../infra/users/modules/createUser/createUser.controller';
import { UpdateUserController } from '../infra/users/modules/updateUser/updateUser.controller';
import { GetUserController } from '../infra/users/modules/getUser/getUser.controller';
import { DeleteUseController } from '../infra/users/modules/deleteUser/deleteUser.controller';
import { CreateTaskController } from '../infra/tasks/modules/createTask/createTask.controller';
import { GetTaskByUserController } from '../infra/tasks/modules/getTaskByUser/getTaskByUser.controller';
import { GetAllTaskController } from '../infra/tasks/modules/getAllTasks/ getAllTask.controller';
import { DeleteTaskController } from '../infra/tasks/modules/deleteTask/deleteTask.controller';
const router = Router();
router.get('/', async (req, res) => {
	return res.status(200).send('Hello');
});
router.get('/users', async (req, res) => {
	const getUserController = container.resolve(GetUserController);
	return await getUserController.handle(req, res);
});
router.post('/user', async (req, res) => {
	const newUserController = container.resolve(CreateUseController);
	return await newUserController.handle(req, res);
});
router.put('/user', async (req, res) => {
	const updateUserController = container.resolve(UpdateUserController);
	return await updateUserController.handle(req, res);
});

router.delete('/user', async (req, res) => {
	const updateUserController = container.resolve(DeleteUseController);
	return await updateUserController.handle(req, res);
});

// tasks
router.get('/tasks/:userId', async (req, res) => {
	const taskByUserController = container.resolve(GetTaskByUserController);
	return await taskByUserController.handle(req, res);
});
// router.get('/tasks/:userId/:id', async (req, res) => {
// 	const newTaskController = container.resolve(CreateTaskController);
// 	return await newTaskController.handle(req, res);
// });

router.post('/tasks', async (req, res) => {
	const newTaskController = container.resolve(CreateTaskController);
	return await newTaskController.handle(req, res);
});

router.get('/tasks', async (req, res) => {
	const newTaskController = container.resolve(GetAllTaskController);
	return await newTaskController.handle(req, res);
});

router.delete('/task', async (req, res) => {
	const deleteTaskController = container.resolve(DeleteTaskController);
	return await deleteTaskController.handle(req, res);
});

export { router };
