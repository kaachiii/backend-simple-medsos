import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Posts } from '../post/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];
}
