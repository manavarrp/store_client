import React from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Clients from "./components/clients/Clients";
import NewClient from "./components/clients/NewClient";
import EditClient from "./components/clients/EditClient";
import Products from "./components/products/Products";
import Orders from "./components/order/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewProduct from "./components/products/NewProduct";
import EditProduct from "./components/products/EditProduct";
import NewOrder from "./components/order/NewOrder";
import Login from "./components/auth/Login";
import { ContextProductProvider } from './context/ContextProduct';
import { ContextAuthProvider } from './context/AuthContext';

function App() {

  return (
    <Router>
      <>
        <ContextAuthProvider>
          <ContextProductProvider>
            <Header />
            <div className="grid contenedor contenido-principal">
              <Sidebar />
              <main className="caja-contenido col-9">
                <Routes>
                  <Route exact path="/" Component={Clients} />
                  <Route exact path="/clientes/nuevo" Component={NewClient} />
                  <Route exact path="/clientes/editar/:id" Component={EditClient} />


                  <Route exact path="/productos" Component={Products} />
                  <Route exact path="/productos/nuevo" Component={NewProduct} />
                  <Route exact path="/productos/editar/:id" Component={EditProduct} />


                  <Route exact path="/pedidos" Component={Orders} />
                  <Route exact path="/pedidos/nuevo/:id" Component={NewOrder} />

                  <Route exact path="/iniciar-sesion" Component={Login} />



                </Routes>
              </main>
              <ToastContainer />
            </div>
          </ContextProductProvider>
        </ContextAuthProvider>
      </>
    </Router>
  )
}

export default App