export class ServerError extends Error {
    constructor(stack?: string) {
        super("Error en el servidor");
        this.name = "ServerError"
        this.stack = stack
    }
}
