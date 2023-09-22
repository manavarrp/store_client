import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const { auth, guardarToken } = useAuthContext()

  const navigate = useNavigate()

  const cerrarSesion = () => {
    //remover token y pasar auth a false
    guardarToken({
      token:'',
      auth: false
    })
//remover token de localStorage
    localStorage.setItem('token', '')

    //rediccionar
    navigate('/iniciar-sesion')
  }

  return (
    <header className="barra">
      <div className="contenedor">
        <div className='contenido-barra'>
          <h1>CRM - Administrador de Clientes</h1>
          {auth.auth ? (
            <button type='button' className='btn btn-rojo' onClick={cerrarSesion}>
              <i className='far fa-times-circle'></i>
              Cerrar Sesión
            </button>
          ) : ''
          }
        </div>

      </div>
    </header>
  )
}

export default Header