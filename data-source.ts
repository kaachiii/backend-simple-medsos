import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';
import { Posts } from './src/post/post.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chika22',
  database: 'socialmedia',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Jangan aktifkan di production!
  logging: true,
});
