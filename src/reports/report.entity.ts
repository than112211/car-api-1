import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Base } from '../shared/entity/base.entity';

@Entity({ name: 'reports' })
export class Report extends Base {
  @Column({
    name: 'approved',
    type: 'boolean',
    default: false,
  })
  approved: boolean;

  @Column({
    name: 'price',
    type: 'int',
  })
  price: number;

  @Column({
    name: 'make',
    type: 'varchar',
  })
  make: string;

  @Column({
    name: 'model',
    type: 'varchar',
  })
  model: string;

  @Column({
    name: 'year',
    type: 'smallint',
  })
  year: number;

  @Column({
    name: 'lng',
    type: 'decimal',
    nullable: true,
  })
  lng: number;

  @Column({
    name: 'lat',
    type: 'decimal',
    nullable: true,
  })
  lat: number;

  @Column({
    name: 'mileage',
    type: 'decimal',
    nullable: true,
  })
  mileage: number;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
