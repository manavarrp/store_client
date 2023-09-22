import React, { useEffect } from 'react'
import useGetListClient from '../../hooks/useGetLisClient'
import { Link, useNavigate } from 'react-router-dom'
import Client from './Client'
import Spinner from '../layout/Spinner'
import { useAuthContext } from '../../context/AuthContext'

const Clients = () => {

    const { loading, listClient, getListClient } = useGetListClient()

    const navigate = useNavigate()

    const { auth } = useAuthContext()
   
    useEffect(() => {
        // Redirige si el usuario ya está autenticado
        if (!auth.auth) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    //console.log(listClient)
    if (loading) return <Spinner />


    return (
        <>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {listClient?.map((client) => (
                    <Client key={client._id} client={client} getListClient={getListClient} />
                ))}
            </ul>
        </>
    )
}

export default Clients