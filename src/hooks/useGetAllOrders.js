import { useCallback, useEffect, useState } from "react"
import { getAllOrders } from "../services"

const useGetAllOrders = () => {
    const [loading, setLoading] = useState(true)
    const [listOrders, setListOrders] = useState([])

    const getOrders = useCallback(async () => {
        try {
            setLoading(true)
            const response = await getAllOrders()
            console.log({response})
            setListOrders(response)
           
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        getOrders()
    }, [getOrders])


    return { loading, listOrders, getOrders }

}

export default useGetAllOrders