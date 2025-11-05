
export interface ILogin{
    phoneNumber: string,
    phoneCountryCode: string,
    password: string
}
export type SigninPayload = Partial<ILogin>;


export interface ISignup{
    phoneNumber: string,
    phoneCountryCode: string,
    password: string
    confirmPassword: string
}
export type SignupPayload = Partial<ISignup>;