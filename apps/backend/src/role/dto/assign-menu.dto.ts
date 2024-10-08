import { IsNotEmpty } from "class-validator";

export class AssignMenuDto {
    @IsNotEmpty({message: '角色ID不能为空'})
    role_id: number;
    @IsNotEmpty({message: '菜单ID不能为空'})
    menu_id: number;
}