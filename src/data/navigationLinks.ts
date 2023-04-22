import type { NavigationLink } from '../types'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiPencil } from 'react-icons/hi'

const links: NavigationLink[] = [
    {
        name: "Crear inventario",
        route: "/user/inventory/new",
        icon: AiOutlinePlus
    },
    {
        name: "Gestionar marcas",
        route: "/user/brands",
        icon: HiPencil
    },
    {
        name: "Gestionar proovedores",
        route: "/user/providers",
        icon: HiPencil
    }
]

export default links;