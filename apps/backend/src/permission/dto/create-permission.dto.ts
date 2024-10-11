export class CreatePermissionDto {
    parent_id: number
    label: string
    name: string
    icon: string
    type: number
    route: string
    sort: number
    hide: boolean
    component: string
}
