import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TypeORMConfig } from './typeorm.config';
export const AppDataSource = new DataSource({
	...TypeORMConfig,
});
