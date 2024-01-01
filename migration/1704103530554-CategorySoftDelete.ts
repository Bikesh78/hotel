import { MigrationInterface, QueryRunner } from "typeorm";

export class CategorySoftDelete1704103530554 implements MigrationInterface {
    name = 'CategorySoftDelete1704103530554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deleteDate\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deleteDate\``);
    }

}
