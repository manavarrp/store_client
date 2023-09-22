import { useCallback, useEffect, useState } from "react"
import {getListProduct} from '../services'
import { toast } from "react-toastify"

const useGetLisProduct = () =>{
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const getListProducts = useCallback( async () =>{
        try {
            setLoading(true)
            const response = await getListProduct()
            setProducts(response.data)
        } catch (error) {
            toast.error(error?.response?.data?.mensaje)
        } finally {
            setLoading(false)
        }
    }, [] )

    useEffect(() => {
        getListProducts()
    }, [getListProducts])
    
    return { getListProducts, loading, products}
}

export default useGetLisProduct