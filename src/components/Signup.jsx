import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Layout from './Layout';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate('/account', {
        replace: true,
        state: {
          logged: true,
          
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
        <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Regístrese para obtener una Cuenta</h1>
        <p className='py-2'>
        ¿Ya tienes una cuenta?{' '}
          <Link to='/login' className='underline'>
          Iniciar sesión.
          </Link>
        </p>
      </div>
      <div className='card-login'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email </label>
          <input
            className='inputEmai'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Contraseña  </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='inputPass'
            type='password'
          />
        </div>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>         
         Registrarse
        </button>
      </form>

      </div>
     
    </div>
    </Layout>
    
  );
};

export default Signup;
