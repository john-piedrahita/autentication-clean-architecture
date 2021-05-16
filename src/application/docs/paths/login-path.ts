export const LoginPath = {
    post: {
        tags: ['Auth'],
        summary: 'Endpoint para autenticar usuarios',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/loginParams'
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
                            $ref: '#/schemas/account'
                        }
                    }
                }
            },
            401: {
                $ref: '#/components/unauthorized'
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
