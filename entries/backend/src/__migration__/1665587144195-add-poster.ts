import { MigrationInterface, QueryRunner } from "typeorm";

export class addPoster1665587144195 implements MigrationInterface {
    name = 'addPoster1665587144195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "pubId" uuid, CONSTRAINT "PK_9af0f091672031956b593689c52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posters" ADD CONSTRAINT "FK_93c58ef440de6c16476890130c6" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posters" DROP CONSTRAINT "FK_93c58ef440de6c16476890130c6"`);
        await queryRunner.query(`DROP TABLE "posters"`);
    }

}
