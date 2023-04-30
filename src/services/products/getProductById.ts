import axios from 'axios'

const PRODUCTS_ROUTE = "http://localhost:4000/api/products/one"

export const getProductById = async (token: string, productId: string, inventoryId: string) => {
    try {
        const response = await axios.post(`${PRODUCTS_ROUTE}/${productId}`, { inventoryId }, {
            headers: {
                authorization: `Bearer ${token}`
            },
        })
        return response
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Error Desconocido')
    }
}