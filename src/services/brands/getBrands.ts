import axios from 'axios'

const BRANDS_ROUTE = "http://localhost:4000/api/brands/"

export const getBrands = async (token: string) => {
    try {
        const response = await axios.get(`${BRANDS_ROUTE}/all`, {
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