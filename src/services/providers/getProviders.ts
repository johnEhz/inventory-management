import axios from 'axios'

const PROVIDERS_ROUTE = "http://localhost:4000/api/providers/"

export const getProviders = async (token: string) => {
    try {
        const response = await axios.get(`${PROVIDERS_ROUTE}/all`, {
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