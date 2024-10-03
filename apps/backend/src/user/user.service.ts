import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;
  
  async login(body: CreateUserDto) {
    return this.prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password
      }
    });
  }


  async create(createUserDto: CreateUserDto) {
    // if user already exists
    const user = await this.prisma.user.findFirst({
      where: {
        username: createUserDto.username
      }
    });

    if (user) {
      return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const {username, password} = createUserDto

    // 密码加密
    return this.prisma.user.create({
      data: {
        username,
        password,
        role_id: 1
      },
    });

  }

}
