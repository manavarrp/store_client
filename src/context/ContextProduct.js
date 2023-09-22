import { createContext, useContext, useState } from "react";

// Crea el contexto global
const ContextProduct = new createContext()

// Proveedor de contexto para envolver tu componente principal
export const ContextProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    return (
        <ContextProduct.Provider value={{ products, setProducts, total, setTotal }}>
            {children}
        </ContextProduct.Provider>
    )
}
// Hook personalizado para acceder al contexto global
export const useContextProduct = () => {
    return useContext(ContextProduct);
}