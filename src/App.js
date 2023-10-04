import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Store from './store/store';
import Panel from './components/Panel';
import Create from './components/Create';
import { Navbar } from './components/Navbar';
import Favorito from './components/Favorito';
import Prestamos from './components/Prestamos';

function App() {
  return ( 
      <div>   
       <Store>
        <AuthContextProvider>
            <Routes>
              <Route path='/' element={<Navbar />} />
              <Route path='/panel' element={
              <ProtectedRoute>
                   <Panel />
              </ProtectedRoute>
              } />
              <Route path='/create' element={
              <ProtectedRoute>
                  <Create/>
              </ProtectedRoute>
               } />
              <Route path='/login' element={<Signin />} />
              <Route path='/register' element={<Signup />} />
              <Route path='/prestamos' element={
              <ProtectedRoute>
                  <Prestamos/>
              </ProtectedRoute>
              } />
              <Route path='/favorito' element={
              <ProtectedRoute>
                  <Favorito/>
              </ProtectedRoute>
              } />
              <Route
                path='/account'
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
            </Routes>
            </AuthContextProvider>
        </Store>
    
    </div>
  );
}

export default App;
