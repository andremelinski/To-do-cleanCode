require('dotenv').config();
export const TypeORMConfig = {
	type: (process.env.TYPEORM_CONNECTION as any) || 'postgres',
	host: process.env.TYPEORM_HOST || 'db',
	port: (process.env.TYPEORM_PORT as any) || 5432,
	username: process.env.TYPEORM_USERNAME || 'postgres',
	password: process.env.TYPEORM_PASSWORD || 'root',
	database: process.env.TYPEORM_DATABASE || 'task',
	synchronize: true,
	logging: false,
	entities: [process.env.TYPEORM_ENTITIES || 'src/shared/typeorm/entities/*.model.{js,ts}'],
	migrations: [process.env.TYPEORM_MIGRATIONS || 'src/shared/typeorm/entities/*.{js,ts}'],
	subscribers: [],
};
