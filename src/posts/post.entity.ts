import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Base } from '../shared/entity/base.entity';

@Entity({ name: 'post' })
export class Post extends Base {
  @Column({
    name: 'title',
    type: 'text',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @Column({
    name: 'image',
    type: 'text',
    nullable: true,
  })
  image: string;

  // khi migrate tự tạo ra userId
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
