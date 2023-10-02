import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Layout from './Layout';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password)
      navigate('/account', {
        replace: true,
        state: {
          logged: true,
          
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <Layout>
      
        <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Iniciar sesión en su Cuenta</h1>
        <p className='py-2'>
        ¿Aún no tienes una cuenta?{' '}
          <Link to='/register' className='underline'>  
         Registrarse.
          </Link>
        </p>
      </div>
      <div className='circle'></div>
    <div className='card-login'>
      <form className='form' onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email  </label>
            <input onChange={(e) => setEmail(e.target.value)} className='inputEmai' type='email' name='email'/>
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Contraseña  </label>
            <input onChange={(e) => setPassword(e.target.value)} className='inputPass' type='password' />
          </div>
          <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Iniciar Sesión
          </button>
      </form>
    </div>  
    
    </div>

    </Layout>
    
  );
};

export default Signin;
