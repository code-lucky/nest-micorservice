import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {

    @Inject(PrismaService)
    private prisma: PrismaService;

    constructor() {}
    
    async create() {
        return 'This action adds a new role';
    }

    async getList() {
        return 'This action returns all role';
    }
    
    async findAll() {
        return `This action returns all role`;
    }
    
    async findOne(id: number) {
        return `This action returns a #${id} role`;
    }
    
    async update(id: number) {
        return `This action updates a #${id} role`;
    }
    
    async remove(id: number) {
        return `This action removes a #${id} role`;
    }

}
