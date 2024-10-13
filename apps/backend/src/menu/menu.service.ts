import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { flattenToTree } from '../utils/flattenToTree';

@Injectable()
export class MenuService {

    @Inject(PrismaService)
    private prisma: PrismaService;

    /**
     * 创建菜单
     * @param createMenuDto 
     * @returns 
     */
    async create(createMenuDto: CreateMenuDto) {
        return await this.prisma.menu.create({
            data: createMenuDto
        });
    }

    /**
     * 获取菜单列表
     * @returns 
     */
    async getList(page: number, limit: number) {
        const total = await this.prisma.menu.count();
        const list = await this.prisma.menu.findMany({
            take: limit,
            skip: (page - 1) * limit
        });
        return { page, limit, total, list };
    }

    /**
     * 获取所有菜单
     * @returns 
     */
    async findAll() {
        return await this.prisma.menu.findMany();
    }

    /**
     * 获取单个菜单
     * @param id 
     * @returns 
     */
    async findOne(id: number) {
        return await this.prisma.menu.findUnique({
            where: { id }
        });
    }

    /**
     * 更新菜单
     * @param id 
     * @returns 
     */
    async update(updateMenuDto: UpdateMenuDto) {
        return await this.prisma.menu.update({
            where: { id: updateMenuDto.id },
            data: updateMenuDto
        });
    }

    /**
     * 删除菜单
     * @param id 
     * @returns 
     */
    async remove(id: number) {
        return await this.prisma.menu.delete({
            where: { id }
        });
    }

    /**
     * 获取菜单树
     * @returns 
     */
    async getMenuTree() {
        const menuList = await this.prisma.menu.findMany({
            where: { deleted: false }
        });
        
        const menuTree = flattenToTree(menuList, 'id', 'parent_id');
        
        // 如果 menuTree 是空数组，则返回 null
        return menuTree;
    }

    /**
     * 批量创建菜单
     * @param createMenuDtoList 
     * @returns 
     */
    async createList(createMenuDtoList: CreateMenuDto[]) {
        return await this.prisma.menu.createMany({
            data: createMenuDtoList
        });
    }
}
