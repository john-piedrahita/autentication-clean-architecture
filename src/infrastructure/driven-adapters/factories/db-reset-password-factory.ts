import {IResetPasswordService} from "@/domain/use-cases/reset-password-service";
import {ResetPasswordServiceImpl} from "@/domain/use-cases/impl/reset-password-service-impl";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";
import {NodemailerAdapter} from "@/infrastructure/driven-adapters/helpers/nodemailer-adapter";
import {MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME, SESSION_SECRET} from "@/application/config/environment";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {JwtAdapter} from "@/infrastructure/driven-adapters/helpers/jwt-adapter";

export const makeDbResetPassword = (): IResetPasswordService => {

    const config = {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
        },
    }

    const jwtAdapter = new JwtAdapter(SESSION_SECRET)
    const accountMongoRepositoryAdapter = new UserMongoRepositoryAdapter()
    const nodemailerRepositoryAdapter = new NodemailerAdapter(config)

    return new ResetPasswordServiceImpl(
        accountMongoRepositoryAdapter,
        accountMongoRepositoryAdapter,
        nodemailerRepositoryAdapter,
        jwtAdapter,
        accountMongoRepositoryAdapter
    )
}