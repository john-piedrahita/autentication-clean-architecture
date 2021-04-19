export class ServerError extends Error {
    constructor(stack?: string) {
        super("Error en el servidor");
        this.name = "Server Error"
        this.stack = stack
    }
}

export class EmailInUseError extends Error {
    constructor() {
        super("El email ya esta en uso");
        this.name = "Email in use Error"
    }
}