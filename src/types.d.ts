export interface NavigationLink {
    name: string
    route: string
    icon: IconType
}


export interface UserRegistration {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type UserLogin = Omit<UserRegistration, 'name' | 'confirmPassword'>