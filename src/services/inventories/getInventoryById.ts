import axios from 'axios'

const INVENTORIES_ROUTE = "http://localhost:4000/api/inventories/"

export const getInventoryById = async (token: string, id:string | undefined) => {
    try {
        const response = await axios.get(`${INVENTORIES_ROUTE}/${id}`, {
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