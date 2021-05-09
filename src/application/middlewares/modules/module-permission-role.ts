import {NextFunction, Request, Response} from "express";
import {serverError} from "@/infrastructure/helpers/http";

export const readModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('MODULES', 'READ_MODULES', req, res, next)
export const detailModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('MODULES', 'DETAIL_MODULES', req, res, next)
export const assignModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('MODULES', 'ASSIGN_MODULES', req, res, next)
export const createModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('MODULES', 'CREATE_MODULES', req, res, next)
export const deleteModulePermissions = (req: Request, res: Response, next: NextFunction) => permission('MODULES', 'DELETE_MODULES', req, res, next)

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
    try {
        if (req['permissions'][0] === undefined) return res.status(401).json({message: 'Unauthorized'})

        const permissions = req['permissions'][0].permission
        const module = req['permissions'][0].module

        for (const permission of permissions) {
            if (module === moduleType && permission.action === action) {
                next()
                return
            }
        }
        return res.status(401).json({message: 'Unauthorized'})
    } catch (e) {
        return serverError(e)
    }

}

