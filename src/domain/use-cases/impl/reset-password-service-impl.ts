import {IResetPasswordService} from "@/domain/use-cases/reset-password-service";
import {IResetPasswordRepository} from "@/domain/models/gateways/reset-password-repository";
import {ISendMail} from "@/domain/use-cases/helpers/send-email";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IUpdateGenericRepository} from "@/domain/models/gateways/update-generic-repository";
import {EMAIL_PARAM, LINK_RESET_TOKEN} from "@/domain/use-cases/helpers/constants";

export class ResetPasswordServiceImpl implements IResetPasswordService {

    constructor(
        private readonly loadGenericByFieldRepository: ILoadGenericByFieldRepository,
        private readonly resetPasswordRepository: IResetPasswordRepository,
        private readonly sendEmailRepository: ISendMail,
        private readonly encrypt: IEncrypt,
        private readonly updateTokenRepository: IUpdateGenericRepository,
    ) {
    }

    async resetPasswordService(email: string, from: string, subject: string, body: string): Promise<void> {
        const accountExist = await this.loadGenericByFieldRepository.loadGenericByFieldRepository(EMAIL_PARAM, email)

        if (!accountExist) return null

        if (accountExist) {
            const token = await this.encrypt.encrypt(accountExist.id)
            await this.updateTokenRepository.updateGenericRepository(accountExist.id, token, LINK_RESET_TOKEN)
            await this.resetPasswordRepository.resetPasswordRepository(accountExist.email)

            await this.sendEmailRepository.sendEmail({
                to: accountExist.email,
                from: from,
                subject: subject,
                body: body,
                token
            })

        }
    }
}