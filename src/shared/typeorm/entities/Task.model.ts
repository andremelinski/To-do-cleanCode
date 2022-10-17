import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.model';

@Entity({ name: 'tasks' })
export class Task {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID(4)
	@IsOptional()
	id?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	description: string;

	@Column()
	@IsBoolean()
	@IsNotEmpty()
	completed: boolean;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@IsString()
	@IsNotEmpty()
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	user_info: string;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at?: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updated_at?: Date;

	private constructor(taskInfo: Task) {
		return Object.assign(this, {
			description: taskInfo?.description,
			completed: taskInfo?.completed,
			user_info: taskInfo?.user_info,
		});
	}

	static create({ description, completed, user_info }: Task) {
		return new Task({ description, completed, user_info });
	}
}
