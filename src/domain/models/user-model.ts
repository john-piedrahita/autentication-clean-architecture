export type UserModel = {
    id: string | number
    name: string
    email: string
    password: string
    avatar?: string
    createdAt: Date
}

export type AddUserParams = Omit<UserModel, 'id'>