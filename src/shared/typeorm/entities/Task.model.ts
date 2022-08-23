import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.model';

@Entity({ name: 'tasks' })
export class Task {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	description: string;

	@Column()
	@IsBoolean()
	completed: boolean;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@IsString()
	@IsNotEmpty()
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	user_info: string;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at?: Date;

	@CreateDateColumn({ type: 'timestamptz' })
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
