import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import usePutEditProduct from '../../hooks/usePutEditProduct'
import { useForm } from 'react-hook-form'
import useGetLisProduct from '../../hooks/useGetListProduct'
import Spinner from '../layout/Spinner'
import { useAuthContext } from '../../context/AuthContext'

const EditProduct = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const {loading, getListProducts } = useGetLisProduct()

  const {
    register,
    handleSubmit
  } = useForm({})

  let { state } = useLocation()

  console.log({ state })

  const product = state?.product

  const { putEditProduct } = usePutEditProduct(id)

 

  const { auth } = useAuthContext()
 
  useEffect(() => {
      // Redirige si el usuario ya está autenticado
      if (!auth.auth) {
          navigate('/iniciar-sesion');
      }
  }, [auth, navigate]);

  const editProductSubmit = async (data) => {
    const formData = new FormData()
    formData.append('nombre', data.nombre)
    formData.append('precio', data.precio)

    // Accede al primer archivo en el FileList
    if (data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]);
    }

    putEditProduct(formData).then((res) => { 
      res && getListProducts()
     })
    //navigate('/productos')
  }


  if(loading) return <Spinner/>

  return (
    <>
      <h2>Editar Producto</h2>

      <form onSubmit={handleSubmit(editProductSubmit)}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Producto" name="nombre" {...register('nombre')} defaultValue={product.nombre} />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" {...register('precio')} defaultValue={product.precio} />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {
            product.imagen ? (
              <img src={`http://localhost:5001/${product.imagen}`} alt={product.nombre} width='300' />
            ) : null
          }
          <input type="file" name="imagen" {...register('imagen')} />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Guardar Cambios" />
        </div>
      </form>
    </>
  )
}

export default EditProduct


