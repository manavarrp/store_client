import { useCallback, useState } from "react"
import { deleteProductByID } from "../services"
import { toast } from "react-toastify"

const useDeleteProduct = (id) => {
    const [loading, setLoading] = useState(false)

    const deleteProduct = useCallback(async () => {
        try {
            setLoading(true)
            const  res = await deleteProductByID(id)
            toast.success(res?.data?.mensaje)
            console.log(res)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.mensaje)
          
        } finally {
            setLoading(false)
        }

    }, [id])
    return { loading, deleteProduct }
}

export default useDeleteProduct