import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReport1666923911128 implements MigrationInterface {
  name = 'CreateReport1666923911128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "report" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "approved" boolean NOT NULL DEFAULT false, 
        "price" integer NOT NULL, 
        "make" character varying NOT NULL, 
        "model" character varying NOT NULL, 
        "year" smallint NOT NULL, 
        "lng" numeric, 
        "lat" numeric, 
        "mileage" numeric, 
        "user_id" uuid, 
        CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT 'false'`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT false`,
    );
    await queryRunner.query(`DROP TABLE "report"`);
  }
}
