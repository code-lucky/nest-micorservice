import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RequireLogin } from '@app/common'; // Replace './path/to/require-login.decorator' with the actual path to the decorator file

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  // user login
  @Post('login')
  async login(@Body() body: CreateUserDto) {
    return await this.userService.login(body);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * get user info
   * @param req 
   * @returns 
   */
  @Get('info')
  @RequireLogin()
  async findUser(@Req() req: Request) {
    console.log(req.user);
    return this.userService.findUser(req.user.userId);
  }
}
