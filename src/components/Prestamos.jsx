import React from 'react';
import Layout from './Layout';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

const Prestamos = () => {
    const [newCollectionElements, setNewCollectionElements] = useState([]);
    const [booksN, setBooksN] = useState([]);
   
    const getElementsFromNewCollection = async () => {
        try {
          const newCollectionRef = collection(db, 'prestamos'); 
          const snapshot = await getDocs(newCollectionRef);
      
          const elements = [];
          snapshot.forEach((doc) => {
            elements.push({ id: doc.id, ...doc.data() });
          });
      
          return elements;
        } catch (error) {
          console.error('Error al obtener elementos de la nueva colección: ', error);
          // Maneja el error según tus necesidades.
          return [];
        }
      };

      const DevolverBookToCollection = async (bookToMove, books) => {
        try {
               
          
          const targetCollectionRef = collection(db, books);
          await addDoc(targetCollectionRef, bookToMove);
          
          
          const updatedBooks = booksN.filter((book) => book.id !== bookToMove.id);
          setBooksN(updatedBooks);
          
          const bookRef = doc(db, 'prestamos', bookToMove.id);
          console.log('Eliminando libro de la colección original');
          console.log(bookRef);
          console.log(bookToMove)
          await deleteDoc(bookRef);
         
      
       
          Swal.fire('Libro devuelto exitosamente', '', 'success');
        } catch (error) {
          console.error('Error al mover el libro: ', error);
        
        }
      };

  useEffect(() => {
    const fetchElements = async () => {
      const elements = await getElementsFromNewCollection();
      setNewCollectionElements(elements);
    };

    // Llama a la función cuando sea necesario, por ejemplo, al cargar la página.
    fetchElements();
  }, []);
     
  return (
    <Layout>
            <h2 className='titulo-bonito'>Lista de Prestamos</h2>
            <div>
        <table className='tabla-elementos'>
            <thead>
            <tr>  
              <th>Titulo</th>
              <th>Autor</th>
              <th>Portada</th>
              <th>Tipo de Libro</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {newCollectionElements.map((element) => (
              <tr key={element.id}>
                <td>{element.title}</td>
                <td>{element.author}</td>
                <td><img className='tablaImg' src={element.cover} width="200" alt={element.title}/></td> 
                <td>{element.review}</td> 
                <td><button onClick={() => DevolverBookToCollection(element, 'books')}>Devolver Libro</button></td>
              </tr>
            ))}
          </tbody>
    </table>
            </div>
    </Layout>
    
  )
}

export default Prestamos