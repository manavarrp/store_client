import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import usePostNewClient from '../../hooks/usePostNewClient'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'

const schema = yup
  .object({
    nombre: yup.string().required('Este campo es requerido'),
    apellido: yup.string().required('Este campo es requerido'),
    empresa: yup.string().required('Este campo es requerido'),
    email: yup.string().required('Este campo es requerido'),
    telefono: yup.string().required('Este campo es requerido'),
  
  })
  .required()

const NewClient = () => {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const { postNewClient } = usePostNewClient()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    initialValues: {
      nombre: '',
      apellido: '',
      empresa:'',
      email:'',
      telefono:''
    }
  })


  const { auth } = useAuthContext()
 
  useEffect(() => {
      // Redirige si el usuario ya está autenticado
      if (!auth.auth) {
          navigate('/iniciar-sesion');
      }
  }, [auth, navigate]);
 

  const onSubmit = (data) => {
    postNewClient(data).then((res) => {
      res && navigate('/')
    }).catch((error) => {
      // Error durante el envío, establece el estado de error
      setSuccess(false);
      setError(error.message || 'Ocurrió un error durante el envío.'); // Puedes personalizar el mensaje de error
    });
  }


  return (
    <>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Cliente" name="nombre" {...register("nombre")}/>
          <p>{errors.nombre?.message}</p>
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" placeholder="Apellido Cliente" name="apellido" {...register("apellido")}/>
          <p>{errors.apellido?.message}</p>
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" placeholder="Empresa Cliente" name="empresa" {...register("empresa")}/>
          <p className=''>{errors.empresa?.message}</p>
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" {...register("email")}/>
          <p>{errors.email?.message}</p>
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="text" placeholder="Teléfono Cliente" name="telefono" {...register("telefono")}/>
          <p>{errors.telefono?.message}</p>
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Cliente" />
        </div>

      </form>

    </>
  )
}

export default NewClient