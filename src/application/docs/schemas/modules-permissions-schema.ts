export const modulesPermissionsSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        module: {
            type: 'string'
        },
        moduleId: {
            type: 'string'
        },
        permission: {
            type: 'array',
            items: {
                $ref: '#/schemas/permissions'
            }
        },
    },
    required: ['id', 'name', 'module', 'moduleId', 'permission']
}

export const moduleSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        module: {
            type: 'string'
        },
        permission: {
            type: 'array',
            items: {
                $ref: '#/schemas/permissions'
            }
        },
    },
    required: ['id', 'module', 'permission']
}
