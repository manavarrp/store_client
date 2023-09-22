import { useCallback, useState } from "react"
import { deleteClient } from "../services"
import { toast } from "react-toastify"

const useDeleteClient = (id) => {
    const [loading, setLoading] = useState(false)

    const deleteClients = useCallback(async () => {
        try {
            setLoading(true)
            const  res = await deleteClient(id)
            toast.success(res?.data?.mensaje)
            console.log(res)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.mensaje)
          
        } finally {
            setLoading(false)
        }

    }, [id])
    return { loading, deleteClients }
}

export default useDeleteClient