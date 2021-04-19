import {readdirSync} from "fs";
import {Express, Router} from "express";

export default (app: Express): void => {
    // Se instancia en esta constante el sistema de rutas de Express
    const router = Router()
    // Generamos la uri inicial de la ruta
    app.use('/api/v1', router)
    // Hacemos la lectura de los archivos de rutas por medio de una iteración
    readdirSync(`${__dirname}/../routes`).map(async file => {
        // Validamos que los archivos tenga la extension correcta
        if (!file.includes('.tests.') && !file.endsWith('.map')) {
            // Completamos el endpoint con la ruta que llegue desde los archivos
            // que existan en la carpeta de rutas
            (await import(`../routes/${file}`)).default(router)
        }
    })
}