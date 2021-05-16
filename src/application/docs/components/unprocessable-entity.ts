export const unprocessableEntity = {
    description: 'Unprocessable entity',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error'
            }
        }
    }
}
