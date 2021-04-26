import {IResetPasswordService} from "@/domain/use-cases/reset-password-service";
import {IResetPasswordRepository} from "@/domain/models/gateways/reset-password-repository";
import {ISendMail} from "@/domain/use-cases/helpers/send-email";
import {ILoadAccountByEmailRepository} from "@/domain/models/gateways/load-account-by-email-repository";

export class ResetPasswordServiceImpl implements IResetPasswordService {

    constructor(
        private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
        private readonly resetPasswordRepository: IResetPasswordRepository,
        private readonly sendEmailRepository: ISendMail
    ) {
    }

    async resetPasswordService(email: string, from: string, subject: string, body: string): Promise<void> {
        const accountExist = await this.loadAccountByEmailRepository.loadAccountByEmailRepository(email)

        if (!accountExist) return null

        if (accountExist) {
            await this.resetPasswordRepository.resetPasswordRepository(accountExist.email)
            await this.sendEmailRepository.sendEmail({
                to: accountExist.email,
                from: from,
                subject: subject,
                body: body
            })
        }
    }
}