import { app } from './app';
import { AppDataSource } from './infra/repositories/postgres/data-source';
import 'reflect-metadata';
// require('dotenv').config({ path: `${__dirname}/../env/.ts-node.env` });
require('dotenv').config();
const PORT = process.env.PORT;

AppDataSource.initialize()
	.then(async () => {
		app.listen(PORT, () => console.log(`Server is running on PORT ${3000}`));
	})
	.catch((error) => console.log(error));
