export type UserModel = {
    id?: string | number
    name: string
    email?: string
    password: string
    linkReset?: string
    avatar?: string
    role?: string
    permissions?: ModulesPermissionsModel[]
    createdAt?: Date
}

export type AddUserParams = Omit<UserModel, 'id'>

export type ModulesPermissionsModel = {
    id: string | number
    name?: string
    module: string
    moduleId: string
    permissions?: PermissionsModel[]

}

export type PermissionsModel = {
    action: string
}
