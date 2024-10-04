import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '@app/prisma';
import { md5 } from 'utils/md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;
  
  @Inject(JwtService)
  private jwtService: JwtService;


  /**
   * User login
   * @param body 
   * @returns 
   */
  async login(body: CreateUserDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        username: body.username,
        password: md5(body.password)
      }
    });

    if (!user) {
      throw new HttpException('User already exists or password error', HttpStatus.BAD_REQUEST);
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

  /**
   * Create user
   * @param createUserDto 
   * @returns 
   */
  async create(createUserDto: CreateUserDto) {
    // if user already exists
    const count = await this.prisma.user.count({
      where: {
        username: createUserDto.username
      }
    });
    if (count === 1) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
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

  /**
   * Get user info
   * @param id 
   * @returns 
   */
  async findUser(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }
}
