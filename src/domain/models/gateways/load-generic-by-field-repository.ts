/**
 * Interfaz generica para hacer busquedas de registros por un campo,
 * puede ser una Coleccion(NoSQL) o una table(SQL)
 */
export interface ILoadGenericByFieldRepository {
    loadGenericByFieldRepository: (field: string, value: string) => Promise<ILoadGenericByFieldRepository.Result>
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