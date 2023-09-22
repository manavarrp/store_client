import { useCallback } from "react"
import { postLogin } from "../services"
import { toast } from "react-toastify"

const usePostLogin = () => {
    const postLoginSend = useCallback(async (payload) => {
        try {
            const response = await postLogin(payload);
            toast.success(response?.data?.mensaje);
            const token = response?.data?.token;
            console.log({ token });
            return token;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.mensaje);
            return Promise.reject(error); // Devuelve el error para que se maneje en el componente
        }
    }, []);

    return postLoginSend;
};


export default usePostLogin