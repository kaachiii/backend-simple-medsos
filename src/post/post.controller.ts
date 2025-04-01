import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { Posts } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
    async createPost(@Body() body: { content: string; authorId: number }): Promise<Posts> {
    return this.postService.createPost(body.content, body.authorId);
}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() data: { content: string }) {
    return this.postService.updatePost(id, data.content);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
