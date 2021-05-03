export type UserModel = {
    id?: string | number
    name: string
    email?: string
    password: string
    linkReset?: string
    avatar?: string
    roles?: RolesUserModel[]
    createdAt?: Date
}

export type AddUserParams = Omit<UserModel, 'id'>

export type RolesUserModel = {
    id?: string | number
    name: string
    permissions?: PermissionsRoleModel[]

}

export type PermissionsRoleModel = {
    id?: string | number
    permission: string
    code: string | number
}
