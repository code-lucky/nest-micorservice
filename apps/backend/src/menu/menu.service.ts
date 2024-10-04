import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {

    @Inject(PrismaService)
    private prisma: PrismaService;

    async create() {
        return 'This action adds a new menu';
    }

    async getList() {
        return 'This action returns all menu';
    }

    async findAll() {
        return `This action returns all menu`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} menu`;
    }

    async update(id: number) {
        return `This action updates a #${id} menu`;
    }

    async remove(id: number) {
        return `This action removes a #${id} menu`;
    }
}
