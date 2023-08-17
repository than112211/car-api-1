import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateImagePost1686302654156 implements MigrationInterface {
  name = 'UpdateImagePost1686302654156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "image" bytea`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT 'false'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
  }
}
