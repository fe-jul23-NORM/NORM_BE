import { MigrationInterface, QueryRunner } from "typeorm";

export class PRODUCT1698324129736 implements MigrationInterface {
  name = 'PRODUCT1698324129736'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "phoneId" character varying(255) NOT NULL, "itemId" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "fullPrice" integer NOT NULL, "price" integer NOT NULL, "screen" character varying(255) NOT NULL, "capacity" character varying(255) NOT NULL, "color" character varying(255) NOT NULL, "ram" character varying(255) NOT NULL, "year" integer NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying(255) NOT NULL, "userId" integer, CONSTRAINT "REL_94f168faad896c0786646fa3d4" UNIQUE ("userId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }

}
