export const loginParamsSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
        },
        password: {
            type: 'string'
        }
    },
    required: ['email', 'password']
}

export const registerParamsSchema = {
    type: 'object',
    properties: {
        fullName: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        password: {
            type: 'string'
        }
    },
    required: ['fullName', 'email', 'password']
}

export const forgotPasswordParamsSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
        }
    },
    required: ['email']
}

export const updatePasswordParamsSchema = {
    type: 'object',
    properties: {
        password: {
            type: 'string',
        }
    },
    required: ['password']
}

export const assignPermissionsParamsSchema = {
    type: 'object',
    properties: {
        fullName: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        permissions: {
            type: 'array',
            items: {
                $ref: '#/schemas/modulesPermissions'
            }
        }
    },
    required: ['fullName', 'email', 'permissions']
}
