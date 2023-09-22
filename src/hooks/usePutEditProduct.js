import { useCallback, useState } from "react"
import { putEditProductByID } from "../services"
import { toast } from "react-toastify"

const usePutEditProduct = (id) => {
    const [loading, setLoading] = useState(false)

    const putEditProduct = useCallback(async (payload) => {
        try {
            setLoading(true)
            const  res = await putEditProductByID(payload, id)
            toast.success(res?.data?.mensaje)
            console.log(res)
           
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.mensaje)
          
        } finally {
            setLoading(false)
        }

    }, [id])
    return { loading, putEditProduct }
}

export default usePutEditProduct