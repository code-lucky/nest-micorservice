import { Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { RequireLogin } from '@app/common';

@RequireLogin()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // create role
  @Post('create')
  async create() {
    return await this.menuService.create();
  }

  // get role list
  @Get('list')
  async getList() {
    return await this.menuService.getList();
  }

  @Get('all')
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get('detail/:id')
  async findOne(id: number) {
    return await this.menuService.findOne(id);
  }

  @Post('update/:id')
  async update(id: number) {
    return await this.menuService.update(id);
  }

  @Post('delete/:id')
  async remove(id: number) {
    return await this.menuService.remove(id);
  }
}
