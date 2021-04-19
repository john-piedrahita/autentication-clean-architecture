import {REGEX} from "@/infrastructure/helpers/constant";

export function fieldsValidation(data: any) {
    let errors = {}
    for (const key in data) {
       switch (data) {
           case isFieldEmpty(data[key]):
               errors[key] = `${key} field is required`
               break
           case key === "email" && !REGEX.test(data[key]):
               errors[key] = `${key} is invalid`
               break
       }
    }

    return { errors, isValid: isFieldEmpty(errors) }
}

function isFieldEmpty (value: any): boolean {
    if (value === undefined || value === null ||
        typeof value === "object" && Object.keys(value).length === 0 ||
        typeof value === "string" && value.trim().length === 0) {
        return true
    }
}