import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CrateTasksDto {
	@IsInt()
	@IsNotEmpty()
	id: number;

	@IsString()
	@IsNotEmpty()
	user_id: string;
}
