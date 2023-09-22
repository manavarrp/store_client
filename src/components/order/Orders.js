import React, { useEffect } from 'react'
import useGetAllOrders from '../../hooks/useGetAllOrders'
import Spinner from '../layout/Spinner'
import GetOrders from './GetOrders'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const Orders = () => {

  const {loading, listOrders, getOrders} = useGetAllOrders()


  const navigate = useNavigate()

  const { auth } = useAuthContext()
 
  useEffect(() => {
      // Redirige si el usuario ya está autenticado
      if (!auth.auth) {
          navigate('/iniciar-sesion');
      }
  }, [auth, navigate]);

  if(loading) return <Spinner/>


  return (
    <>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
       {listOrders.map(orders => (
        <GetOrders orders={orders} key={orders._id} getOrders={getOrders}/>
       ))}
      </ul>
    </>
  )
}

export default Orders