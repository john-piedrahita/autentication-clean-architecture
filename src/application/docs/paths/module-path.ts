export const modulePath = {
    get: {
        security: [{
            bearerAuth: []
        }],
        tags: ['Module'],
        summary: 'Endpoint para listar todos los módulos del sistema',
        description: 'Este endpoint solo puede ser ejecutado por **usuarios autenticados**',
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/modulesPermissions'
                        }
                    }
                }
            },
            403: {
                $ref: '#/components/forbidden'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    },
    post: {
        security: [{
            bearerAuth: []
        }],
        tags: ['Module'],
        summary: 'Endpoint para registrar un módulo',
        description: 'Este endpoint solo puede ser ejecutado por **usuarios autenticados**',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/moduleParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/module'
                        }
                    }
                }
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
