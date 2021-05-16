export const updatePasswordPath = {
    put: {
        tags: ['Auth'],
        summary: 'Endpoint para cambiar la contraseña.',
        parameters: [{
            in: 'path',
            name: 'token',
            description: 'Token enviado al correo con la URL',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/updatePassword'
                    }
                }
            }
        },
        responses: {
            204: {
                description: 'No content'
            },
            400: {
                $ref: '#/components/badRequest'
            },
            422: {
                $ref: '#/components/unprocessableEntity'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}
