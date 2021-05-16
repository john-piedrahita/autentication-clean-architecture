export const forgotPasswordPath = {
    post: {
        tags: ['Auth'],
        summary: 'Endpoint para recuperar la contraseña por medio de un correo',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/forgotPassword'
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
