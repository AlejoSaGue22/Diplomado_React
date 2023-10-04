import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import imaA from "../images/logoBiblioteca.jpg";

export const Navbar = () => {
    
const { user, logout } = UserAuth();
  const {state} = useLocation()

  const navigate = useNavigate();

    console.log(state);

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/login',
          {replace: true,});
          console.log('Estás desconectado')
        } catch (e) {
          console.log(e.message);
        }
    }
    const RutasInicio = () => {
        
      navigate('/panel', {
        replace: true,
        state: {
          logged: true,
        }
      })     
  }

  
  


  return (
    <>
            <header className='container-fluid'>
              <div className='container'>
              <h1 onClick={RutasInicio} className='titlePrincipal'>    
                <Link to='/panel'><img className='logo' id="logo" src={imaA} alt='logo'/>BIBLIOTECA</Link>
               </h1>
              </div>
            <div className='inicio'>
                <h1 onClick={RutasInicio}>
                    <Link to='/panel'>INICIO</Link>
                </h1>
            </div>
            

  
            {
              state?.logged ? (
            <div className="user">
                <span className='username'>{user && user.email}</span>
                <button className='btn-logout' onClick={handleLogout}>Cerrar Sesion</button>
            </div>
              ) : (            
                    <nav>                     
                      <Link to="/login" >Iniciar Sesion</Link>
                      <Link to="/register" >Registrarse</Link>
                    </nav>               
              )}
            </header>
            

              <Outlet />
    </>
    
   );
};
