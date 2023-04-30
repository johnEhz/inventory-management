import axios from 'axios'
import { ProductCreation } from '../../types'

const CREATE_ROUTE = "http://localhost:4000/api/products"

export const createProduct = async (token: string | undefined, product: ProductCreation) => {
    try {
        const response = await axios.post(`${CREATE_ROUTE}`, product, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Error Desconocido')
    }
}