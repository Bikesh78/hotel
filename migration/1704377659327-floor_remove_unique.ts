import { MigrationInterface, QueryRunner } from "typeorm";

export class FloorRemoveUnique1704377659327 implements MigrationInterface {
    name = 'FloorRemoveUnique1704377659327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hotel_table\` DROP FOREIGN KEY \`FK_b4ef2eefb943469db820f516a50\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` ON \`floor\``);
        await queryRunner.query(`DROP INDEX \`REL_b4ef2eefb943469db820f516a5\` ON \`hotel_table\``);
        await queryRunner.query(`ALTER TABLE \`hotel_table\` CHANGE \`floorId\` \`floor_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`hotel_table\` ADD CONSTRAINT \`FK_f40b66ff065c1fe305d393b2e32\` FOREIGN KEY (\`floor_id\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hotel_table\` DROP FOREIGN KEY \`FK_f40b66ff065c1fe305d393b2e32\``);
        await queryRunner.query(`ALTER TABLE \`hotel_table\` CHANGE \`floor_id\` \`floorId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b4ef2eefb943469db820f516a5\` ON \`hotel_table\` (\`floorId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` ON \`floor\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`hotel_table\` ADD CONSTRAINT \`FK_b4ef2eefb943469db820f516a50\` FOREIGN KEY (\`floorId\`) REFERENCES \`floor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
