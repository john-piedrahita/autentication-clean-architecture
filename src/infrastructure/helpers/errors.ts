export class ServerError extends Error {
    constructor(stack?: string) {
        super("Error en el servidor");
        this.name = "ServerError"
        this.stack = stack
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Error en el email o la contraseña');
        this.name = 'UnauthorizedError'
    }
}
