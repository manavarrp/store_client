import React from 'react'
import { Link } from 'react-router-dom'
import useDeleteClient from '../../hooks/useDeleteClient'

const Client = ({ client, getListClient }) => {

    const { _id, nombre, apellido, empresa, email, telefono } = client

    const {loading, deleteClients } = useDeleteClient(_id)

    const handleDeleteClient = async () => {
        deleteClients().then((res) => {
            if (!loading) {
                getListClient()
            }
        })
    }

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>{telefono}</p>
            </div>
            <div className="acciones" >
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul" state={{ client }} >
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>

                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo" state={{ client }} >
                    <i className="fas fa-plus"></i>
                    Nuevo Pedido
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={handleDeleteClient}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li >
    )
}

export default Client