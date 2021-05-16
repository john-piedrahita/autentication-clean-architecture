import {
    errorSchema, registerParamsSchema, accountSchema, loginParamsSchema, forgotPasswordParamsSchema, updatePasswordParamsSchema,
    loaduserByIdSchema, modulesPermissionsSchema, permissionsSchema, moduleParamsSchema, moduleSchema, assignPermissionsParamsSchema,
    bearerAuthSchema
} from './schemas/index'

export default {
    account: accountSchema,
    loginParams: loginParamsSchema,
    registerParams: registerParamsSchema,
    error: errorSchema,
    forgotPassword: forgotPasswordParamsSchema,
    updatePassword: updatePasswordParamsSchema,
    loadUserById: loaduserByIdSchema,
    modulesPermissions: modulesPermissionsSchema,
    permissions: permissionsSchema,
    moduleParams: moduleParamsSchema,
    module: moduleSchema,
    assignPermissions: assignPermissionsParamsSchema,
    bearerAuth: bearerAuthSchema
}
