import { UserRegistration, UserLogin } from '../../types'
import axios from 'axios'

const REGISTER_ROUTE = 'http://localhost:4000/api/auth/register'
const LOGIN_ROUTE = 'http://localhost:4000/api/auth/login'
const WHO_ROUTE = 'http://localhost:4000/api/auth/who'

export const createUser = async (userRegister: UserRegistration) => {
    try {
        const { name, email, password } = userRegister
        const response = await axios.post(REGISTER_ROUTE, {
            name,
            email,
            password
        })
        return response
    } catch (error: any) {
        if (error.response && (error.response.status === 409 || error.response.status === 400 || error.response.status === 500)) {
            console.error(error.response.data)
            throw new Error(error.response.data.message)
        }
        else {
            throw new Error('Error Desconocido')
        }
    }
}

export const loginUser = async (userRegister: UserLogin) => {
    try {
        const { email, password } = userRegister
        const response = await axios.post(LOGIN_ROUTE, {
            email,
            password
        })
        return response
    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
            console.error(error.response.data)
            throw new Error(error.response.data.message)
        }
        else {
            throw new Error('Error Desconocido')
        }
    }
}

export const whoUser = async (token: string) => {
    try {
        const response = await axios.get(WHO_ROUTE, {
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