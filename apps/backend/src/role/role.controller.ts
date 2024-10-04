import { Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RequireLogin } from '@app/common';

@RequireLogin()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // create role
  @Post('create')
  async create() {
    return await this.roleService.create();
  }

  // get role list
  @Get('list')
  async getList() {
    return await this.roleService.getList();
  }

  @Get('all')
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get('detail/:id')
  async findOne(id: number) {
    return await this.roleService.findOne(id);
  }

  @Post('update/:id')
  async update(id: number) {
    return await this.roleService.update(id);
  }

  @Post('delete/:id')
  async remove(id: number) {
    return await this.roleService.remove(id);
  }
}
