import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';
import { md5 } from 'utils/md5';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;
  
  async login(body: CreateUserDto) {

    const user = await this.prisma.user.findFirst({
      where: {
        username: body.username,
        password: md5(body.password)
      }
    });

    if (!user) {
      return new HttpException('用户不存在或用户密码错误', HttpStatus.BAD_REQUEST);
    }
    
    delete user.password;

    return user;
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
        password: md5(password),
        role_id: 1
      },
    });

  }

}
