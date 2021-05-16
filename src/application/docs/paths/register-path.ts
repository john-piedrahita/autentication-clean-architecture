export const registerPath = {
    post: {
        tags: ['Auth'],
        summary: 'Endpoint para registrar usuarios',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/registerParams'
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
