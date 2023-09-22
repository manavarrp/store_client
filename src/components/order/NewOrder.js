import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchProduct from './SearchProduct';
import { FormProvider, useForm } from 'react-hook-form';
import AmountProduct from './AmountProduct';
import usePostCreateOrder from '../../hooks/usePostCreateOrder';
import { useContextProduct } from '../../context/ContextProduct'
import { useAuthContext } from '../../context/AuthContext';

const NewOrder = () => {

  let { state } = useLocation();

  //console.log({ state })

  const methods = useForm({})

  const navigate = useNavigate();

  const { postCreateNewOrder } = usePostCreateOrder()

  const { products, total } = useContextProduct()


  const { auth } = useAuthContext()
 
  useEffect(() => {
      // Redirige si el usuario ya está autenticado
      if (!auth.auth) {
          navigate('/iniciar-sesion');
      }
  }, [auth, navigate]);

  const createNewOrderOnsubmit = () => {
    const payload = {
      cliente: state?.client?._id,
      pedido: products.map((product) => ({
        producto: product._id,
        cantidad: product.cantidad,
      })),
      total
    }
    console.log(payload)
    postCreateNewOrder(payload)
    navigate('/pedidos')

  }

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre: {state?.client?.nombre} {state?.client?.apellido}</p>
        <p>Teléfono: {state?.client?.telefono}</p>
      </div>
      <FormProvider {...methods} >
        <SearchProduct />

        <ul className="resumen">
          <AmountProduct />
        </ul>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Pedido" onClick={createNewOrderOnsubmit}  disabled={total === 0}/>
        </div>
      </FormProvider>
    </>
  )
}

export default NewOrder