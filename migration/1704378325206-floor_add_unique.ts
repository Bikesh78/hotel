import { MigrationInterface, QueryRunner } from "typeorm";

export class FloorAddUnique1704378325206 implements MigrationInterface {
    name = 'FloorAddUnique1704378325206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`floor\` ADD UNIQUE INDEX \`IDX_a6b4f1cfb48849d05e0158079f\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`floor\` DROP INDEX \`IDX_a6b4f1cfb48849d05e0158079f\``);
    }

}
