import React, { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import useGetLisProduct from '../../hooks/useGetListProduct'
import Product from './Product'
import { useAuthContext } from '../../context/AuthContext'

const Products = () => {

    const { loading, products, getListProducts } = useGetLisProduct()

    const navigate = useNavigate()

    const { auth } = useAuthContext()
   
    useEffect(() => {
        // Redirige si el usuario ya está autenticado
        if (!auth.auth) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    if (loading) return <Spinner />


    return (
        <>
            <h2>Productos</h2>

            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo producto
            </Link>

            <ul className="listado-productos">
                {products?.map((product) => (
                    <Product key={product._id} product={product} getListProducts={getListProducts}/>
                ))}
            </ul>
        </>
    )
}

export default Products