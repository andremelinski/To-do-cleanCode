import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	user_name: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	password: string;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at?: Date;

	@CreateDateColumn({ type: 'timestamptz' })
	updated_at?: Date;

	// @BeforeInsert()
	// generateId() {
	// 	if (this.id) {
	// 		return;
	// 	}
	// 	this.id = uuid();
	// }

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
