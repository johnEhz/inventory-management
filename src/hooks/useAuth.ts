import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthProvider'

export const useAuth = () => {
    return useContext(AuthContext)
}
