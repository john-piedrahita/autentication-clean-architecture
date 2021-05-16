export const deleteModulePath = {
    delete: {
        security: [{
            bearerAuth: []
        }],
        tags: ['Module'],
        summary: 'Endpoint para eliminar un módulo por el id.',
        description: 'Este endpoint solo puede ser ejecutado por **usuarios autenticados**',
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
            204: {
                description: 'No content',
            },
            400: {
                $ref: '#/components/badRequest'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}
