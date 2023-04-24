import axios from 'axios'
import { InventoryCreation } from '../../types'

const CREATE_ROUTE = "http://localhost:4000/api/inventories"

export const createInventory = async (token: string | undefined, inventory: InventoryCreation) => {
    try {
        const response = await axios.post(`${CREATE_ROUTE}`, inventory, {
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