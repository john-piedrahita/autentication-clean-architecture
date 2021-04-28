import nodemailer from 'nodemailer'
import {ISendMail} from "@/domain/use-cases/helpers/send-email";

export class NodemailerAdapter implements ISendMail {

    constructor(
        private readonly configuration: Object
    ) {
    }

    async sendEmail(message: ISendMail.ParamsMail): Promise<void> {
        const transporter = nodemailer.createTransport(this.configuration);

        await transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: message.subject,
            html: `Hi <a href="http:localhost:4000/reset-password/${message.token}">click en el link</a>
                    Please click on the following link to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        })
    }
}