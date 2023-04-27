import axios from 'axios'
import { InventoryUpdate } from '../../types'

const INVENTORIES_ROUTE = "http://localhost:4000/api/inventories/"

export const updateInventoryById = async (token: string, id: string | undefined, inventory: InventoryUpdate) => {
    try {
        const response = await axios.put(`${INVENTORIES_ROUTE}/${id}`, inventory, {
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