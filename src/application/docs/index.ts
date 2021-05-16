import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
    openapi: '3.0.0',
    info: {
        title: "Authentication API",
        description: "API para un servicio de autenticación con roles y permisos",
        version: "1.0.0",
        contact: {
            name: 'John Piedrahita',
            email: 'citymanager02@gmail.com',
            url: 'https://www.linkedin.com/in/john-piedrahita-30593a179/'
        },
        license: {
            name: 'GPL-3.0-or-later',
            url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
        }
    },
    servers: [{
        url: '/api/v1'
    }],
    tags: [],
    paths,
    schemas,
    components
}
