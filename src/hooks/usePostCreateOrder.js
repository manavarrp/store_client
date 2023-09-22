import { useCallback, useState } from "react"
import { postCreateOrder } from "../services"
import { toast } from "react-toastify"

const usePostCreateOrder = () => {
    const [loading, setLoading] = useState(true)

    const postCreateNewOrder = useCallback(async (payload) => {
        try {
            setLoading(true)
            const response = await postCreateOrder(payload)
            toast.success(response?.data?.mensaje)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return { postCreateNewOrder, loading }

}


export default usePostCreateOrder