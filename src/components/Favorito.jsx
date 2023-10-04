import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Book from './Book';

const Favorito = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    // Recuperar los datos del localStorage
    const itemJSON = localStorage.getItem("miItemFavorito");

    if (itemJSON) {
      // Convertir la cadena JSON en un objeto JavaScript
      const itemFromLocalStorage = JSON.parse(itemJSON);

      // Actualizar el estado 'registros' con el objeto recuperado
      setRegistros([itemFromLocalStorage]);
    }
  }, []);

  const eliminarDelLocalStorage = () => {
    // Eliminar el elemento del localStorage
    localStorage.removeItem("miItemFavorito");

    // Actualizar el estado para reflejar la eliminación
    setRegistros([]);
  };

  return (
    <Layout>
        <div>
      <h2 className='titulo-bonito'>FAVORITOS</h2>
      <ul>
        {registros.length > 0 ? (
           
          registros.map((registro, index) => (
            <li key={registro.id}>
                 <Book item={registro}/> 
                 <button className='btn-logout' onClick={eliminarDelLocalStorage}>Quitar de la Lista</button>
            </li>
             

          ))
          
        ) : (
          <li className='lista'>No hay elementos favoritos.</li>
        )}
      </ul>
    </div>


    </Layout>
    
  );
}

export default Favorito;
