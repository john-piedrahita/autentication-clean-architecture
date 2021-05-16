export const loaduserByIdSchema =  {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        fullName: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        linkReset: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        role: {
            type: 'string'
        },
        permissions: {
            type: 'array',
            items: {
                $ref: '#/schemas/modulesPermissions'
            }
        },
        createdAt: {
            type: 'string'
        },
    },
    required: ['id', 'fullName', 'email', 'password', 'linkReset', 'avatar', 'role', 'permissions', 'createdAt']
}
