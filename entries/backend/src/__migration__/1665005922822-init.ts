import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665005922822 implements MigrationInterface {
    name = 'init1665005922822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pubs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_98a3fd9d0f3d37cb3d1c97faa27" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pubs"`);
    }

}
