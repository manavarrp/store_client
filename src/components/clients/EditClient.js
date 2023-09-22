import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usePutEditClient from '../../hooks/usePutEditClient';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import useGetListClient from '../../hooks/useGetLisClient';
import { useAuthContext } from '../../context/AuthContext';

const schema = yup
  .object({
    nombre: yup.string().required('Este campo es requerido'),
    apellido: yup.string().required('Este campo es requerido'),
    empresa: yup.string().required('Este campo es requerido'),
    email: yup.string().required('Este campo es requerido'),
    telefono: yup.string().required('Este campo es requerido'),

  })
  .required()


const EditClient = () => {

  const { id } = useParams();

  const { putEditClient } = usePutEditClient(id)
  const { getListClient } = useGetListClient()

  const navigate = useNavigate();

  let { state } = useLocation();

  const client = state?.client

  //console.log({ client })


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { auth } = useAuthContext()
 
  useEffect(() => {
      // Redirige si el usuario ya está autenticado
      if (!auth.auth) {
          navigate('/iniciar-sesion');
      }
  }, [auth, navigate]);


  const onSubmit = (data) => {

    const payload = {
      ...client,
      ...data
    }
    console.log({ payload })
    putEditClient(payload).then((res) => {res && getListClient() })
    navigate('/')
  }


  return (
    <>
      <h2>Editar Cliente</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Cliente" name="nombre" {...register("nombre")} defaultValue={client?.nombre} />
          <p>{errors.nombre?.message}</p>
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" placeholder="Apellido Cliente" name="apellido" {...register("apellido")} defaultValue={client?.apellido} />
          <p>{errors.apellido?.message}</p>
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" placeholder="Empresa Cliente" name="empresa" {...register("empresa")} defaultValue={client?.empresa} />
          <p className=''>{errors.empresa?.message}</p>
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" {...register("email")} defaultValue={client?.email} />
          <p>{errors.email?.message}</p>
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="text" placeholder="Teléfono Cliente" name="telefono" {...register("telefono")} defaultValue={client?.telefono} />
          <p>{errors.telefono?.message}</p>
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Guardar Cambios" />
        </div>

      </form>

    </>
  )
}

export default EditClient