import { IsInt, IsNotEmpty, IsString, IsUUID, Validate } from 'class-validator';

export class DeleteTaskDto {
	@IsUUID(4)
	@IsNotEmpty()
	id: string;

	@IsUUID(4)
	@IsNotEmpty()
	userId: string;

	private constructor(taskInfo: DeleteTaskDto) {
		return Object.assign(this, {
			id: taskInfo?.id,
			userId: taskInfo?.userId,
		});
	}

	static create({ id, userId }: DeleteTaskDto) {
		return new DeleteTaskDto({ id, userId });
	}
}
