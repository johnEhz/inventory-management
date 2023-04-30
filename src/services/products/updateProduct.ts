import axios from 'axios'
import { ProductCreation } from '../../types'

const UPDATE_ROUTE = "http://localhost:4000/api/products"

export const updateProduct = async (token: string | undefined, product: ProductCreation, productId: string) => {
    try {
        const response = await axios.put(`${UPDATE_ROUTE}/${productId}`, product, {
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