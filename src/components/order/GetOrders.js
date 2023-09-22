import React from 'react'
import { Link } from 'react-router-dom'
import useDeleteOrder from '../../hooks/useDeleteOrder'

const GetOrders = ({ orders, getOrders }) => {

    const { loading, deleteOrder } = useDeleteOrder(orders._id)


    const deleteOrderOnSubmit = () =>{
        deleteOrder().then((res) => {
            if (!loading) {
                getOrders()
            }
        })
       
    }

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {orders._id}</p>
                <p className="nombre">Cliente: {orders?.cliente?.nombre} {orders?.cliente?.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {orders.pedido.map(order => (
                            <li>
                                <p>{order?.producto?.nombre}</p>
                                <p>Precio: $ {order?.producto?.precio}</p>
                                <p>Cantidad: {order?.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: ${orders?.total} </p>
            </div>
            <div className="acciones">
                <Link to={''} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Pedido
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar" onClick={deleteOrderOnSubmit}>
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default GetOrders