import clientAxios from "../config/axios";

export const getLisClient = async () => {
    const response = await clientAxios.get('/clientes')
    return response
}

export const postnewClient = async (payload) => {
    const response = await clientAxios.post('/clientes', payload)
    return response
}

export const getLisClientByID = async (id) => {
    const response = await clientAxios.get(`/clientes/${id}`)
    return response
}

export const pustEditClient = async (payload, id) => {
    const response = await clientAxios.put(`/clientes/${id}`, payload)
    return response
}

export const deleteClient = async (id) => {
    const response = await clientAxios.delete(`/clientes/${id}`)
    return response
}

export const getListProduct = async () => {
    const response = await clientAxios.get('/productos')
    return response
}


export const deleteProductByID = async (id) => {
    const response = await clientAxios.delete(`/productos/${id}`)
    return response
}

export const postNewProduct = async (payload) => {
    const response = await clientAxios.post('/productos', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}

export const putEditProductByID = async (payload, id) => {
    const response = await clientAxios.put(`/productos/${id}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}

export const postSearchProduct = async (query) => {
    const response = await clientAxios.post(`/productos/buscar/${query}`)
   // console.log({response})
    return response
}

export const postCreateOrder = async (payload) => {
    const response = await clientAxios.post('/pedidos' , payload)
    return response
} 

export const getAllOrders = async () => {
    const response = await clientAxios.get('/pedidos')
    const res = response.data
    console.log({res})
    return res
}

export const deleteOrderByID = async (id) => {
    const response = await clientAxios.delete(`/pedidos/${id}`)
    return response
}

export const postLogin = async (payload) => {
    const response = await clientAxios.post('/iniciar-sesion', payload)
    return response
}