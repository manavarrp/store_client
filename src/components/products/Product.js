import React from 'react'
import { Link } from 'react-router-dom'
import useDeleteProduct from '../../hooks/useDeleteProduct'

const Product = ({ product, getListProducts }) => {

    const { _id, nombre, precio, imagen } = product

    const { loading, deleteProduct } = useDeleteProduct(_id)

    console.log({ product })

    const deleteProductSubmit = async () => {
       await deleteProduct().then((res) => {
            if (!loading) {
                getListProducts()
            }
        })
    }

    return (


        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                {
                    imagen ? (
                        <img src={`http://localhost:5001/${imagen}`} alt={nombre} />
                    ) : null
                }
            </div>
            <div className="acciones" >
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul" state={{ product }} >
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={deleteProductSubmit}>
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li >
    )
}

export default Product