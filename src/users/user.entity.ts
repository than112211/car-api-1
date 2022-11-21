import { Base } from '../shared/entity/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity({ name: 'users' })
export class User extends Base {
  @Column({
    name: 'email',
    type: 'varchar',
    length: '50',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @Column({
    name: 'admin',
    type: 'boolean',
    default: 'false',
  })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
