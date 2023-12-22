import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndRoleCreate1703260907295 implements MigrationInterface {
    name = 'UserAndRoleCreate1703260907295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`password\` text NOT NULL, \`roleId\` int NULL, UNIQUE INDEX \`REL_c28e52f758e7bbc53828db9219\` (\`roleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`user_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`DROP INDEX \`REL_c28e52f758e7bbc53828db9219\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
    }

}
