import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendService {
  constructor(private readonly prismaService: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getUser() {
    return await this.prismaService.user.findMany();
  }

  // 创建用户
  async createUser() {
    return await this.prismaService.user.create({
      data: {
        username: 'Alice',
        password: '123456',
        updatedAt: new Date(),
      },
    });
  }
}
