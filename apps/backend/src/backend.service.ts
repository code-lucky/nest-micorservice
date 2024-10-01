import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendService {
  constructor(private readonly prismaService: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getUser() {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: 1
      }
    })
    return 'Hello World!';
  }
}
