export const moduleParamsSchema = {
    type: 'object',
    properties: {
        module: {
            type: 'string',
        },
        permission: {
            type: 'array',
            items: {
                $ref: '#/schemas/permissions'
            }
        }
    },
    required: ['module', 'permission']
}
