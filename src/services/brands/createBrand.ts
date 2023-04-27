import axios from 'axios'
import { BrandCreation } from '../../types'

const CREATE_ROUTE = "http://localhost:4000/api/brands"

export const createBrand = async (token: string | undefined, brand: BrandCreation) => {
    try {
        const response = await axios.post(`${CREATE_ROUTE}`, brand, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error: any) {
        if (error.response.data) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Error Desconocido')
    }
}