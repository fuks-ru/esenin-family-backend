import { MigrationInterface, QueryRunner } from "typeorm";

export class addPosterPubId1665590322843 implements MigrationInterface {
    name = 'addPosterPubId1665590322843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posters" DROP CONSTRAINT "FK_93c58ef440de6c16476890130c6"`);
        await queryRunner.query(`ALTER TABLE "posters" ALTER COLUMN "pubId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posters" ADD CONSTRAINT "FK_93c58ef440de6c16476890130c6" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posters" DROP CONSTRAINT "FK_93c58ef440de6c16476890130c6"`);
        await queryRunner.query(`ALTER TABLE "posters" ALTER COLUMN "pubId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posters" ADD CONSTRAINT "FK_93c58ef440de6c16476890130c6" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
