export interface ISendMail {
    sendEmail: (message: ISendMail.ParamsMail) => Promise<void>
}

export namespace ISendMail {
    export type ParamsMail = {
        to: string,
        from: string
        subject: string
        body: string,
        token?: string
    }
}