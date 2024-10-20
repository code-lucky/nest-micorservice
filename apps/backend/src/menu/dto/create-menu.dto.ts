import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty({ description: '菜单名称' })
    @IsNotEmpty({message: '菜单名称不能为空'})
    label: string;

    @ApiProperty({ description: '菜单路径' })
    @IsNotEmpty({message: '菜单路径不能为空'})
    path: string;

    @ApiProperty({ description: '菜单图标' })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({ description: '父级菜单ID' })
    @IsOptional()
    @IsInt()
    parent_id?: number = 0;

    @ApiProperty({ description: '菜单类型' })
    @IsOptional()
    type?: number; // Optional, defaults to 0

    @ApiProperty({ description: '菜单排序' })
    @IsOptional()
    sort?: number = 0;

    @ApiProperty({ description: '是否隐藏' })
    @IsOptional()
    hide?: boolean = false;

    @ApiProperty({ description: '菜单外链' })
    @IsOptional()
    frame_src?: string;

    @ApiProperty({ description: '菜单组件' })
    @IsOptional()
    component?: string;
}