import { MigrationInterface, QueryRunner } from "typeorm";

export class FloorsOrdersSesson1704367317856 implements MigrationInterface {
    name = 'FloorsOrdersSesson1704367317856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`floor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`due_amount\` int NOT NULL, \`paid_amount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hotel_table\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, \`state\` enum ('vacant', 'occupied', 'unavailable') NOT NULL DEFAULT 'vacant', \`floorId\` int NULL, UNIQUE INDEX \`IDX_7b0d95095c12a54f7c44145359\` (\`name\`), UNIQUE INDEX \`REL_b4ef2eefb943469db820f516a5\` (\`floorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bill_amount\` int NOT NULL, \`payment_status\` enum ('paid', 'incomplete', 'not_paid') NOT NULL DEFAULT 'not_paid', \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`hotelTableId\` int NULL, \`customerId\` int NULL, UNIQUE INDEX \`REL_59c3a3e6fe719bc51a7de3c33d\` (\`hotelTableId\`), UNIQUE INDEX \`REL_71af38e3b65734ad10f485e350\` (\`customerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hotel_table\` ADD CONSTRAINT \`FK_b4ef2eefb943469db820f516a50\` FOREIGN KEY (\`floorId\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_59c3a3e6fe719bc51a7de3c33d9\` FOREIGN KEY (\`hotelTableId\`) REFERENCES \`hotel_table\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_71af38e3b65734ad10f485e3501\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_71af38e3b65734ad10f485e3501\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_59c3a3e6fe719bc51a7de3c33d9\``);
        await queryRunner.query(`ALTER TABLE \`hotel_table\` DROP FOREIGN KEY \`FK_b4ef2eefb943469db820f516a50\``);
        await queryRunner.query(`DROP INDEX \`REL_71af38e3b65734ad10f485e350\` ON \`session\``);
        await queryRunner.query(`DROP INDEX \`REL_59c3a3e6fe719bc51a7de3c33d\` ON \`session\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`REL_b4ef2eefb943469db820f516a5\` ON \`hotel_table\``);
        await queryRunner.query(`DROP INDEX \`IDX_7b0d95095c12a54f7c44145359\` ON \`hotel_table\``);
        await queryRunner.query(`DROP TABLE \`hotel_table\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` ON \`floor\``);
        await queryRunner.query(`DROP TABLE \`floor\``);
    }

}
