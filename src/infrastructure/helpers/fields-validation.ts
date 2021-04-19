import {REGEX} from "@/infrastructure/helpers/constant";

export function fieldsValidation(data: any) {
    let errors = {}
    for (const key in data) {
        if (isFieldEmpty(data[key])) {
            errors[key] = `${key} field is required`
        } else if (key === "email" && !REGEX.test(data[key])) {
            errors[key] = `${key} is invalid`
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