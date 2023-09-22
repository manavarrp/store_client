import React from 'react'
import { useForm } from 'react-hook-form'
import usePostLogin from '../../hooks/usePostLogin'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {

    const { register, handleSubmit } = useForm({})

    const postLoginSend = usePostLogin()

    const navigate = useNavigate()

    // console.log({ token })

    const { auth, guardarToken } = useAuthContext(); // Obtener la función guardarToken desde el contexto

    const loginOnSubmit = async (data) => {
        try {
            const token = await postLoginSend(data);
            localStorage.setItem('token', token);
            guardarToken({
                token,
                auth: true
            });
            console.log({ auth });
            navigate('/');
        } catch (error) {
            // Handle login error here
            console.error(error);
           // toast.error(error.response.data.mensaje); // Mostrar mensaje de error
            navigate('/iniciar-sesion'); // Redirigir a la vista de inicio de sesión
        }
    }
    // Guardar el token en localStorage y en el contexto antes de enviar la solicitud

    return (
        <div className='login'>
            <h2>INICIAR SESIÓN</h2>

            <div className='contenedor-formulario'>
                <form onSubmit={handleSubmit(loginOnSubmit)}>
                    <div className='campo'>
                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            placeholder='Email Para Iniciar Sesión'
                            {...register('email')}
                        />

                    </div>
                    <div className='campo'>
                        <label>Password</label>
                        <input
                            type='text'
                            name='password'
                            placeholder='password Para Iniciar Sesión'
                            {...register('password')}
                        />

                    </div>
                    <input type='submit' value='Iniciar Sesión' className='btn btn-verde btn-block' />
                </form>
            </div>

        </div>
    )
}

export default Login