export interface IUpdatePasswordService {
    updatePasswordService: (data: string, token: string) => Promise<void>
}