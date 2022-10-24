import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Report } from './report';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

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
