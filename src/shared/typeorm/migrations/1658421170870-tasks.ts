import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class tasks1658421170870 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'tasks',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'completed',
						type: 'boolean',
					},
					{
						name: 'user_info',
						type: 'uuid',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
					},
				],
			})
		);

		await queryRunner.createForeignKey(
			'tasks',
			new TableForeignKey({
				name: 'user_id_fk',
				columnNames: ['user_info'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('tasks', 'user_id_fk');
		await queryRunner.dropTable('tasks');
	}
}
