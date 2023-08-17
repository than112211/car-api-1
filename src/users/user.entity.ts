import { Base } from '../shared/entity/base.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Post } from '../posts/post.entity';

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
  // args 1 trả về entity target
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // args 1 trả về entity target
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}

@Entity({ name: 'tokens' })
export class Token extends Base {
  @Column({
    name: 'access_token',
    type: 'varchar',
  })
  access_token: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
  })
  refresh_token: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
