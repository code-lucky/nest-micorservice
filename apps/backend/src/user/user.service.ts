import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';
import { md5 } from 'utils/md5';
import { count } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;
  
  @Inject(JwtService)
  private jwtService: JwtService;

  async login(body: CreateUserDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        username: body.username,
        password: md5(body.password)
      }
    });

    if (!user) {
      throw new HttpException('用户不存在或用户密码错误', HttpStatus.BAD_REQUEST);
    }
    delete user.password;

    return {
      user,
      token: this.jwtService.sign({
        userId: user.id,
        username: user.username
      }, {
        expiresIn: '7d'
      })
    }
  }


  async create(createUserDto: CreateUserDto) {
    // if user already exists
    const count = await this.prisma.user.count({
      where: {
        username: createUserDto.username
      }
    });

    if (count === 1) {
      throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const { username, password } = createUserDto

    // 密码加密
    return this.prisma.user.create({
      data: {
        username,
        password: md5(password),
        role_id: 1
      },
    });
  }

  // get user info
  async findUser(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }
}
