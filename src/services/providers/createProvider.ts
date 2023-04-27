import axios from 'axios'
import { ProviderCreation } from '../../types'

const CREATE_ROUTE = "http://localhost:4000/api/providers"

export const createProvider = async (token: string | undefined, provider: ProviderCreation) => {
    try {
        const response = await axios.post(`${CREATE_ROUTE}`, provider, {
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