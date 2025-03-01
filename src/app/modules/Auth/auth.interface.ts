export interface TUser {
    name: string,
    email: string,
    phoneNumber?: string,
    password: string,
    role: 'customer' | 'mealProvider',
    status: 'active' | 'blocked',
    isDeleted: boolean,
}