import { useCallback, useState } from "react"
import { postSearchProduct } from "../services"
import { toast } from "react-toastify"

const usePostSearchProduct = () => {
  const [loading, setLoading] = useState(true)
  const [getProduct, setGetProduct] = useState([])

  const postSearchProducts = useCallback(async (query) => {
    try {
      setLoading(true);

      const response = await postSearchProduct(query);

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Se encontraron productos, los agregamos a getProduct
          const newProducts = response.data.map((product) => ({
          ...product,
          cantidad: 0, // Agregar la propiedad 'cantidad' inicializada en 0
        }));
        setGetProduct((prevProducts) => [...prevProducts, ...newProducts]);
      } else {
        // No se encontraron productos, mostramos una alerta de Toast
        toast.info('No se encontraron resultados en la búsqueda');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [])
  console.log(getProduct)
  return { loading, getProduct, setGetProduct, postSearchProducts }
}

export default usePostSearchProduct