export interface IResetPasswordService {
    resetPasswordService: (email: string, from?: string, subject?: string, body?: string) => Promise<void>
}