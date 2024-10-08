// apps/backend/src/role/dto/create-role.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty({ message: '角色名称不能为空' })
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
}