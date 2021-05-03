export interface IResetPasswordRepository {
    resetPasswordRepository?: (email: string) => Promise<void>
}