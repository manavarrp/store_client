import { useCallback, useState } from "react"
import { deleteOrderByID } from "../services"
import { toast } from "react-toastify"

const useDeleteOrder = (id) => {
    const [loading, setLoading] = useState(false)

    const deleteOrder = useCallback(async () => {
        try {
            setLoading(true)
            const  res = await deleteOrderByID(id)
            toast.success(res?.data?.mensaje)
            console.log(res)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.mensaje)
          
        } finally {
            setLoading(false)
        }

    }, [id])
    return { loading, deleteOrder }
}

export default useDeleteOrder