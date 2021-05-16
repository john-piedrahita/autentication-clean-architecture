export const unauthorized = {
    description: 'Password and email invalid',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error'
            }
        }
    }
}
