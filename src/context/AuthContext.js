import { createContext, useContext, useState } from "react";

// Crea el contexto global
const AuthContext = new createContext()

// Proveedor de contexto para envolver tu componente principal
export const ContextAuthProvider = ({ children }) => {
    const [auth, guardarToken] = useState({
        token: '',
        auth: false
    })

    return (
        <AuthContext.Provider value={{ auth, guardarToken }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para acceder al contexto global
export const useAuthContext = () => {
    return useContext(AuthContext)
}