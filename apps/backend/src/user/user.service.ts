import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';
import { md5 } from 'utils/md5';
import { count } from 'console';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;
  
  async login(body: CreateUserDto) {

    const count = await this.prisma.user.count({
      where: {
        username: body.username,
        password: md5(body.password)
      }
    });

    if (count === 0) {
      return new HttpException('用户不存在或用户密码错误', HttpStatus.BAD_REQUEST);
    }
    
    return '登录成功';

    // delete user.password;

    // return user;
  }


  async create(createUserDto: CreateUserDto) {
    // if user already exists
    const user = await this.prisma.user.findFirst({
      where: {
        username: createUserDto.username
      }
    });

    if (user) {
      console.log('User already exists', HttpStatus.BAD_REQUEST);
      throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);
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
