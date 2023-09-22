import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as yup from "yup"
import usePostCreatproduct from '../../hooks/usePostCreatproduct'
import { useAuthContext } from '../../context/AuthContext'




const schema = yup
  .object({
    nombre: yup.string().required('Este campo es requerido'),
    precio: yup.string().required('Este campo es requerido')

  })
  .required()

const NewProduct = () => {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const { loading, postCreateProduct } = usePostCreatproduct()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })


  const { auth } = useAuthContext()
 
  useEffect(() => {
      // Redirige si el usuario ya está autenticado
      if (!auth.auth) {
          navigate('/iniciar-sesion');
      }
  }, [auth, navigate]);

  const createProductSubmit = async (data) => {


    const formData = new FormData()
    formData.append('nombre', data.nombre)
    formData.append('precio', data.precio)

    // Accede al primer archivo en el FileList
    if (data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]);
    }

    console.log({ imagen: data.imagen[0] })
    await postCreateProduct(formData)
    navigate('/productos')

  }

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={handleSubmit(createProductSubmit)}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Producto" name="nombre" {...register('nombre')} />
          <p>{errors.nombre?.message}</p>
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number" name="precio" min="0.00" step="0.10" placeholder="Precio" {...register('precio')} />
          <p>{errors.precio?.message}</p>
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" {...register('imagen')} />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </>
  )
}

export default NewProduct