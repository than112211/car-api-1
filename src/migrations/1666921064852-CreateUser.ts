import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1666921064852 implements MigrationInterface {
  name = 'CreateUser1666921064852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying(50) NOT NULL,
        "password" character varying NOT NULL, 
        "admin" boolean NOT NULL DEFAULT 'false', 
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
