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
    _id?: string
    _reference: string
    _inventory?: string
    name: string
    description: string
    brand?: Brand
    provider?: Provider
    quantity: number
    price: number
    invest?: number
    createdAt?: string
    updatedAt?: string

}

export interface Inventory {
    _id?: string
    _author: string
    name: string
    description: string
    createdAt?: string
    updatedAt?: string
}

export interface ProductCreation extends Omit<Product, '_id' | 'createdAt' | 'updatedAt'> {
    brand?: {
        name: string
    },
    provider?: {
        name: string
    }
}

export interface ProductDetailI {
    product: Product | undefined,
    show: boolean
}

export interface ProductModal {
    productId: string | undefined,
    show: boolean
}


export type InventoryRoute = Omit<Inventory, '_author' | 'description' | 'items' | 'updatedAt'>

export type InventoryCreation = Omit<Inventory, '_id' | '_author' | 'items' | 'updatedAt' | 'createdAt'>

export type InventoryUpdate = Omit<Inventory, '_id' | '_author' | 'updatedAt' | 'createdAt'>

export type BrandCreation = Omit<Brand, '_id' | '_author' | 'updatedAt' | 'createdAt'>

export type ProviderCreation = Omit<Provider, '_id' | '_author' | 'updatedAt' | 'createdAt'>