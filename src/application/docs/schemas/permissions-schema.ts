export const permissionsSchema = {
    type: 'object',
    properties: {
        action: {
            type: 'string'
        },
    },
    required: ['action']
}
