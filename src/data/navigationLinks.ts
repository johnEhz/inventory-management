import type { NavigationLink } from '../types'
import { AiFillBank, AiFillAliwangwang, AiFillAlert } from 'react-icons/ai'

const links:NavigationLink[] = [
    {
        name: "Home",
        route: "/home",
        icon: AiFillBank
    },
    {
        name: "About",
        route: "/about",
        icon: AiFillAliwangwang
    },
    {
        name: "None",
        route: "/none",
        icon: AiFillAlert
    }
]

export default links;