/**
 * Interfaz generica para hacer busquedas de registros por un campo,
 * puede ser una Coleccion(NoSQL) o una table(SQL)
 */
export interface ILoadGenericByFieldRepository<T> {
    loadGenericByFieldRepository: (field?: string, value?: string) => Promise<T>
}

export namespace ILoadGenericByFieldRepository {
    export type Result = {
        id: string,
        name: string,
        email?: string,
        password: string,
        linkReset?: string
    }
}