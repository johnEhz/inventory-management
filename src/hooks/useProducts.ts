import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/products/getProducts'
import { Product } from '../types'

const useProducts = () => {
    const [loading, setLoading] = useState(false)
    const [userProducts, setUserProducts] = useState<Product[]>();

    useEffect(() => {
        
    }, [])

    return [
        loading,
        userProducts
    ]
}

export default useProducts