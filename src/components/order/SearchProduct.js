import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import usePostSearchProduct from '../../hooks/usePostSearchProduct'
import AmountProduct from './AmountProduct'
import Spinner from '../layout/Spinner'
import { useLocation } from 'react-router-dom'
import { useContextProduct } from '../../context/ContextProduct'

const SearchProduct = () => {

  const { register, handleSubmit } = useFormContext({
  })


  let { state } = useLocation()

  console.log({ state })

  const { loading, getProduct, setGetProduct, postSearchProducts } = usePostSearchProduct()

  const { total, setTotal, setProducts} = useContextProduct();

  // Actualiza el pedido cuando cambie la cantidad de productos
  const restarProductos = i => {
    // copiar el arreglo original de productos
    const allProducts = [...getProduct];

    // validar si esta en 0 no puede ir mas alla
    if (allProducts[i].cantidad === 0) return;

    // decremento
    allProducts[i].cantidad--;

    // almacenarlo en el state
    setGetProduct(allProducts);
    allProducts(allProducts)
  }

  const aumentarProductos = i => {
    // copiar el arreglo para no mutar el original
    const allProducts = [...getProduct];

    // incremento
    allProducts[i].cantidad++;

    // almacenarlo en el state
    setGetProduct(allProducts);
    setProducts(allProducts)
  }

  const eliminarProductoPedido = id => {
    const allProducts = getProduct.filter(producto => producto._id !== id);
    setGetProduct(allProducts)
  }

  const updateTotal = () => {
    if (getProduct.length === 0) {
      setTotal(0)
    }
    //calcular nuevo total
    let newTotal = 0
    getProduct.map(product => newTotal += (product.cantidad * product.precio))
    setTotal(newTotal)
  }

  useEffect(updateTotal, [getProduct, setTotal])

  const searchProductsOnSubmit = (data) => {
    //console.log({ getProduct, data, dat: data.productos })
    postSearchProducts(data.productos)

  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(searchProductsOnSubmit)}>
          <legend>Busca un Producto y agrega una cantidad</legend>
          <div className="campo">
            <label>Productos:</label>
            <input type="text" placeholder="Nombre Productos" name='productos' {...register('productos')} />
          </div>
          <input type="submit" value="Buscar producto" className='btn btn-azul btn-block' />
        </form>
        {loading && <Spinner />}
        {getProduct.length > 0 && (
          <div>
            <h3>Resultados de la búsqueda:</h3>
            <ul>
              {getProduct.map((product, index) => (
                <AmountProduct
                  key={product._id}
                  product={product}
                  index={index}
                  restarProductos={restarProductos}
                  aumentarProductos={aumentarProductos}
                  eliminarProductoPedido={eliminarProductoPedido}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="campo">
        <p className='total'>Total a pagar: <span>$ {total}</span></p>
      </div>
    </>
  )
}

export default SearchProduct