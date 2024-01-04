import { MigrationInterface, QueryRunner } from "typeorm";

export class FloorTableOrderSession1704360911285 implements MigrationInterface {
    name = 'FloorTableOrderSession1704360911285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`floor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`table\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, \`state\` enum ('vacant', 'occupied', 'unavailable') NOT NULL DEFAULT 'vacant', \`floorId\` int NULL, UNIQUE INDEX \`IDX_2cb0b78846e0a65d35a4cd02d3\` (\`name\`), UNIQUE INDEX \`REL_37248549d1b4d4be22988d87f2\` (\`floorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`due_amount\` int NOT NULL, \`paid_amount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bill_amount\` int NOT NULL, \`payment_status\` enum ('paid', 'incomplete', 'not_paid') NOT NULL DEFAULT 'not_paid', \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`tableId\` int NULL, \`customerId\` int NULL, UNIQUE INDEX \`REL_05460f481afcf56d4aaa971ac9\` (\`tableId\`), UNIQUE INDEX \`REL_71af38e3b65734ad10f485e350\` (\`customerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`table\` ADD CONSTRAINT \`FK_37248549d1b4d4be22988d87f22\` FOREIGN KEY (\`floorId\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_05460f481afcf56d4aaa971ac91\` FOREIGN KEY (\`tableId\`) REFERENCES \`table\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_71af38e3b65734ad10f485e3501\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_71af38e3b65734ad10f485e3501\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_05460f481afcf56d4aaa971ac91\``);
        await queryRunner.query(`ALTER TABLE \`table\` DROP FOREIGN KEY \`FK_37248549d1b4d4be22988d87f22\``);
        await queryRunner.query(`DROP INDEX \`REL_71af38e3b65734ad10f485e350\` ON \`session\``);
        await queryRunner.query(`DROP INDEX \`REL_05460f481afcf56d4aaa971ac9\` ON \`session\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`REL_37248549d1b4d4be22988d87f2\` ON \`table\``);
        await queryRunner.query(`DROP INDEX \`IDX_2cb0b78846e0a65d35a4cd02d3\` ON \`table\``);
        await queryRunner.query(`DROP TABLE \`table\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` ON \`floor\``);
        await queryRunner.query(`DROP TABLE \`floor\``);
    }

}
