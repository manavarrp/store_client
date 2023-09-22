import { useCallback, useEffect, useState } from "react"
import { getLisClientByID } from "../services"

const useGetLisClientByID = (id) =>{
    const [loading, setLoading] = useState(true)
    const [listClientbyID, setListClient] = useState([])

    const getListClient = useCallback(async () => {
        try {
            setLoading(true)
            const response = await getLisClientByID(id)
        
            setListClient(response?.data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }

    }, [id])


    useEffect(() => {
        getListClient()
    }, [getListClient])
    
    return {loading, listClientbyID, getListClient}

}

export default useGetLisClientByID