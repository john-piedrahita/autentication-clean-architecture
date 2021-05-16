export const assignPermissionsPath = {
    put: {
        security: [{
            bearerAuth: []
        }],
        tags: ['Auth'],
        summary: 'Endpoint para asignar permisos al usuario por cada módulo del sistema.',
        description: 'Este endpoint solo puede ser ejecutado por **usuarios autenticados**',
        parameters: [{
            in: 'path',
            name: 'id',
            description: 'Parametro de la URL',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/assignPermissions'
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
            403: {
                $ref: '#/components/forbidden'
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
