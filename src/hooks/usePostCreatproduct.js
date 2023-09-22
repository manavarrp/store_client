import { useCallback, useState } from "react"
import { postNewProduct } from "../services"
import { toast } from "react-toastify"

const usePostCreatproduct = () =>{
    const [ loading, setLoading] = useState(true)

    const postCreateProduct = useCallback( async (payload)=>{
        try {
            setLoading(true)
            const response = await postNewProduct(payload)
            console.log({response})
            toast.success(response?.data?.mensaje)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    },[])

    return { postCreateProduct, loading}

}

export default usePostCreatproduct