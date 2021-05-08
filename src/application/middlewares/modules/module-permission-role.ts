import {NextFunction, Request, Response} from "express";

export const readModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('PERMISSIONS', 'READ_PERMISSIONS', req, res, next)
export const detailModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('PERMISSIONS', 'DETAIL_PERMISSIONS', req, res, next)
export const assignModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('PERMISSIONS', 'ASSIGN_PERMISSIONS', req, res, next)
export const createModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('PERMISSIONS', 'CREATE_PERMISSIONS', req, res, next)
export const updateModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('PERMISSIONS', 'UPDATE_PERMISSIONS', req, res, next)
export const deleteModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('PERMISSIONS', 'DELETE_PERMISSIONS', req, res, next)

export const readUserPermissions = (req: Request, res: Response, next: NextFunction) => permission('USERS', 'READ_USERS', req, res, next)
export const detailUserPermissions = (req: Request, res: Response, next: NextFunction) => permission('USERS', 'DETAIL_USERS', req, res, next)
export const createUserPermissions = (req: Request, res: Response, next: NextFunction) => permission('USERS', 'CREATE_USERS', req, res, next)
export const updateUserPermissions = (req: Request, res: Response, next: NextFunction) => permission('USERS', 'UPDATE_USERS', req, res, next)
export const deleteUserPermissions = (req: Request, res: Response, next: NextFunction) => permission('USERS', 'DELETE_USERS', req, res, next)


/**
 * This function provides us with the way to verify if the user who is going to perform the action has the permissions.
 * @param moduleType
 * @param action
 * @param req
 * @param res
 * @param next
 */
function permission(moduleType: string, action: string, req: Request, res: Response, next: NextFunction) {
    if (req['roles'][0] === undefined) return res.status(401).json({message: 'Unauthorized'})

    const roles = req['roles'][0].permissions
    const module = req['roles'][0].module

    for (const role of roles) {
        if (module === moduleType && role.action === action) {
            next()
            return
        }
    }
    return res.status(401).json({message: 'Unauthorized'})
}

