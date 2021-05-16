import {
    LoginPath, registerPath, forgotPasswordPath, updatePasswordPath, loadUserByIdPath, modulePath, deleteModulePath,
    assignPermissionsPath
} from './paths/'

export default  {
    '/login': LoginPath,
    '/account': registerPath,
    '/forgot-password': forgotPasswordPath,
    '/reset-password/{token}': updatePasswordPath,
    '/users/{id}': loadUserByIdPath,
    '/modules': modulePath,
    '/modules/{moduleId}': deleteModulePath,
    '/assign-permissions-modules/{userId}': assignPermissionsPath
}
