import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CrateTaskDto {
	@IsString()
	@IsNotEmpty()
	description: string;
	@IsBoolean()
	completed: boolean;

	private constructor(taskInfo: CrateTaskDto) {
		return Object.assign(this, {
			description: taskInfo.description,
			completed: taskInfo.completed,
		});
	}

	static create({ description, completed }: CrateTaskDto) {
		return new CrateTaskDto({ description, completed });
	}
}
