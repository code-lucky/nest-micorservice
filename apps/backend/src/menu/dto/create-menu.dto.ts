import { IsNotEmpty } from "class-validator";

export class CreateMenuDto {
    @IsNotEmpty({message: '菜单名称不能为空'})
    name: string;
    @IsNotEmpty({message: '菜单路径不能为空'})
    path: string;
    @IsNotEmpty({message: '菜单图标不能为空'})
    icon: string;
    pid?: number; // Optional, defaults to 0
    type?: number; // Optional, defaults to 0
    component?: string;
    sort?: number; // Optional, defaults to 0
    hidden?: boolean; // Optional, defaults to false
    deleted?: boolean; // Optional, defaults to false
}