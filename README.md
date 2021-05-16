# Autenticación basada en Arquitectura limpia

**Pieza de software basada en [Arquitectura limpia](https://medium.com/bancolombia-tech/clean-architecture-aislando-los-detalles-4f9530f35d7a), para el manejo de la autenticación con roles y permisos de acuerdo a los modulos del sistema.**

**La estructura del proyecto la generé con el siguiente plugin: [clean-scaffold](https://www.npmjs.com/package/clean-scaffold)**

****

### Instala y corre la aplicación

1. Clona el repositorio

```bash
    git clone https://github.com/john-piedrahita/autentication-clean-architecture.git
    cd authentication-clean-architecture
```

2. Instala las dependencias

```bash
    npm install
```

3. Corre la aplicación

```bash
    npm run watch
```

4. Crea archivo .env en la raiz del proyecto


5. Configura las variables de entorno en el archivo .env
````
MONGO_DEVELOPMENT=
MONGO_PRODUCTION=
JWT_SECRET=Dm4yX4iC
NODE_ENV=develoment
HOST=127.0.0.1
PORT=9000

# Email configuration
MAIL_MAILER=
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=

MAIL_FROM=john.doe@gmail.com
MAIL_SUBJECT="Password reset"
   ````

6. Crear un usuario administrador para ejecutar las rutas que estan protegidas con la siguiente estructura:

```json
{
    "fullName": "John Admin",
    "email": "admin@mail.com",
    "role": "ADMIN",
    "password": "123456"
}
```


7. Accede a la documentación de las rutas para tener un contexto más claro del flujo de la aplicación, la encuentras en: `http://localhost:9000/api-docs/`
