import { useCallback, useState } from "react"
import { pustEditClient } from "../services"
import { toast } from "react-toastify"

const usePutEditClient = (id) => {
    const [loading, setLoading] = useState(false)

    const putEditClient = useCallback(async (payload) => {
        try {
            setLoading(true)
            const  res = await pustEditClient(payload, id)
            toast.success(res?.data?.mensaje)
            console.log(res)
           
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.mensaje)
          
        } finally {
            setLoading(false)
        }

    }, [id])
    return { loading, putEditClient }
}

export default usePutEditClient