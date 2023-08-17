import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateImageTypePost1686305725321 implements MigrationInterface {
  name = 'UpdateImageTypePost1686305725321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "image" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT 'false'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "image" bytea`);
  }
}
