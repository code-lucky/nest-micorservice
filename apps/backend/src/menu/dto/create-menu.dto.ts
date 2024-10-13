import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty({message: '菜单名称不能为空'})
    label: string;

    @IsNotEmpty({message: '菜单名称不能为空'})
    name: string;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsNotEmpty({message: '菜单路径不能为空'})
    route: string;

    @IsOptional()
    parent_id?: number; // Optional, defaults to 0

    @IsOptional()
    type?: number; // Optional, defaults to 0

    @IsOptional()
    sort?: number;

    @IsOptional()
    hide?: boolean; // Optional, defaults to false

    @IsOptional()
    frame_src?: string;

    @IsOptional()
    component?: string;

    @IsOptional()
    deleted?: boolean; // Optional, defaults to false
}