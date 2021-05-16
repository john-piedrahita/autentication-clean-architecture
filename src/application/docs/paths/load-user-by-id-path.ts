export const loadUserByIdPath = {
    get: {
        security: [{
            bearerAuth: []
        }],
        tags: ['User'],
        summary: 'Endpoint para buscar un usuario por el id.',
        description: 'Este endpoint solo puede ser ejecutada por **usuarios autenticados**',
        parameters: [{
            in: 'path',
            name: 'id',
            description: 'parametro de la URL',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        responses: {
            200: {
                description: 'success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/loadUserById'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}
