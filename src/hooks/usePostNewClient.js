import { useCallback, useState } from "react"
import { postnewClient } from "../services"
import { toast } from "react-toastify"

const usePostNewClient = () => {
    const [loading, setLoading] = useState(false)

    const postNewClient = useCallback(async (payload) => {
        try {
            setLoading(true)
            const  res = await postnewClient(payload)
            toast.success('Usuario creado con exito')
            console.log(res)
            return Promise.resolve(true)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.mensaje)
            Promise.reject(error)
        } finally {
            setLoading(false)
        }

    }, [])
    return { loading, postNewClient }
}

export default usePostNewClient