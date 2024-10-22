import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty({ description: '菜单名称' })
    @IsNotEmpty({message: '菜单名称不能为空'})
    @IsString()
    label: string;

    @ApiProperty({ description: '菜单路径' })
    @IsNotEmpty({message: '菜单路径不能为空'})
    @IsString()
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
    @IsInt()
    type?: number; // Optional, defaults to 0

    @ApiProperty({ description: '菜单排序' })
    @IsInt()
    @IsOptional()
    sort?: number = 0;

    @ApiProperty({ description: '是否隐藏' })
    @IsBoolean()
    hide?: boolean = false;

    @ApiProperty({ description: '菜单外链' })
    @IsOptional()
    @IsString()
    frame_src?: string;

    @ApiProperty({ description: '菜单组件' })
    @IsString()
    component?: string;
}