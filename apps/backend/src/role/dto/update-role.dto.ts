// extends CreateRoleDto
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateRoleDto } from "./create-role.dto";

export class UpdateRoleDto extends CreateRoleDto {
    @IsNotEmpty({ message: '角色ID不能为空' })
    @IsNumber()
    id: number;
}