import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterNameTable1666925210060 implements MigrationInterface {
  name = 'AlterNameTable1666925210060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "report" RENAME TO "reports"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reports" RENAME TO "report"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
  }
}
