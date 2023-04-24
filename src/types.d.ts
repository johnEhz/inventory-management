export interface NavigationLink {
    name: string
    route: string
    Icon: IconType
}


export interface UserRegistration {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type UserLogin = Omit<UserRegistration, 'name' | 'confirmPassword'>

export interface AuthUser extends Omit<UserRegistration, 'password' | 'confirmPassword'> {
    token?: string
}

export interface AuthContextI {
    user?: AuthUser,
    login?: (data: AuthUser) => void
    logout?: () => void
}

export interface Brand {
    _id: string
    _author: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface Provider {
    _id: string
    _author: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface Product {
    _reference: string
    name: string
    description: string
    brand: Brand
    provider: Provider
    quantity: number
    price: number
    createdAt: string
    updatedAt: string
    invest: number

}

export interface Inventory {
    _id: string
    _author: string
    name: string
    description: string
    items: Product[]
    createdAt: string
    updatedAt: string
}

export type InventoryRoute =  Omit<Inventory, '_author' | 'description' | 'items' | 'updatedAt'>

export type InventoryCreation = Omit<Inventory, '_id' | '_author' | 'items' | 'updatedAt' | 'createdAt'>