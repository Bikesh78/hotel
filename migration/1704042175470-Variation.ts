import { MigrationInterface, QueryRunner } from "typeorm";

export class Variation1704042175470 implements MigrationInterface {
    name = 'Variation1704042175470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`variations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` int NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`variations\` ADD CONSTRAINT \`FK_a471ef11612596a4afb19de0f06\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`variations\` DROP FOREIGN KEY \`FK_a471ef11612596a4afb19de0f06\``);
        await queryRunner.query(`DROP TABLE \`variations\``);
    }

}
