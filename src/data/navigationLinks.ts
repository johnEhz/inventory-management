import type { NavigationLink } from '../types'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiPencil } from 'react-icons/hi'

const links: NavigationLink[] = [
    {
        name: "Crear inventario",
        route: "/app/inventory/new",
        Icon: AiOutlinePlus
    },
    {
        name: "Gestionar marcas",
        route: "/app/brands",
        Icon: HiPencil
    },
    {
        name: "Gestionar proovedores",
        route: "/app/providers",
        Icon: HiPencil
    }
]

export default links;