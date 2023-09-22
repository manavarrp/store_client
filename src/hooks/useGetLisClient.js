import { useCallback, useEffect, useState } from "react"
import { getLisClient } from "../services"

const useGetListClient = () => {
    const [loading, setLoading] = useState(true)
    const [listClient, setListClient] = useState([])

    const getListClient = useCallback(async () => {
        try {
            setLoading(true)
            const response = await getLisClient()
            setListClient(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }, [])


    useEffect(() => {
        getListClient()
    }, [getListClient])

    return { loading, listClient, getListClient }

}

export default useGetListClient