import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async getUserById(userId: number): Promise<User> {
    const user = await this.postRepository.manager.findOne(User, { where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createPost(content: string, userId: number): Promise<Posts> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');

    const post = this.postRepository.create({ content, user });
    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Posts[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async getPostById(id: number): Promise<Posts | null> {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async updatePost(id: number, content: string): Promise<Posts> {
    await this.postRepository.update(id, { content });
    const updatedPost = await this.getPostById(id);
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost; // Return updated post
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
