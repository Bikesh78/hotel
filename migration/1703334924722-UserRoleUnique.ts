import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleUnique1703334924722 implements MigrationInterface {
    name = 'UserRoleUnique1703334924722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD UNIQUE INDEX \`IDX_30ddd91a212a9d03669bc1dee7\` (\`role\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP INDEX \`IDX_30ddd91a212a9d03669bc1dee7\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`role\` text NOT NULL`);
    }

}
