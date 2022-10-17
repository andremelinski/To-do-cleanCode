import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, BeforeUpdate } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	@IsOptional()
	@IsUUID(4)
	id?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	user_name: string;

	@Column()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	@MinLength(4, {
		message: 'Password is too short. Minimal length is $constraint1 characters',
	})
	password: string;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at?: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updated_at?: Date;

	private constructor(userInfo: User) {
		return Object.assign(this, {
			user_name: userInfo?.user_name,
			email: userInfo?.email,
			password: userInfo?.password,
		});
	}

	static create({ user_name, email, password }: User) {
		return new User({ user_name, email, password });
	}
}
