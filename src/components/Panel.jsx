import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from "./Layout";
import Book from "./Book";
import Swal from 'sweetalert2';

export default function Panel(){
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const moveBookToCollection = async (bookToMove, prestamos) => {
      try {
       
      
        const targetCollectionRef = collection(db, prestamos);
        await addDoc(targetCollectionRef, bookToMove);
    
  
        const updatedBooks = books.filter((book) => book.id !== bookToMove.id);
        setBooks(updatedBooks);

        const bookRef = doc(db, 'books', bookToMove.id);
        console.log('Eliminando libro de la colección original');
          console.log(bookRef);
          console.log(bookToMove)
        await deleteDoc(bookRef);
    
     
        Swal.fire('Libro Prestado Exitosamente', '', 'success');
      } catch (error) {
        console.error('Error al mover el libro: ', error);
      
      }
    };

    useEffect(() => {
      const fetchBooks = async () => {
        const booksCollectionRef = collection(db, 'books');
        const snapshot = await getDocs(booksCollectionRef);
  
        const booksData = [];
        snapshot.forEach((doc) => {
          const bookData = doc.data();
          booksData.push({ ...bookData, id: doc.id }); // Agregamos el ID del documento como propiedad 'id'
        });
  
        setBooks(booksData);
      };
  
      fetchBooks();
    }, []);
    
     


    const handleDelete = async (bookToDelete) => {
      try {
        const result = await Swal.fire({
          title: 'Estas Seguro?',
          text: "Estos cambios no se pueden revertir!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!'
        });
  
        if (result.isConfirmed) {
          
          const bookRef = doc(db, 'books', bookToDelete.id);
          await deleteDoc(bookRef);
          const updatedBooks = books.filter((book) => book.id !== bookToDelete.id);
          setBooks(updatedBooks);
          Swal.fire(
            'Deleted!',
            'El Libro ha sido Eliminado.',
            'success'
          );
        }
      } catch (error) {
        console.error('Error al eliminar el libro: ', error);
      }
    };
  
  

    const Rutascre = () => {
        
        navigate('/create', {
          replace: true,
          state: {
            logged: true,
          }
        })     
    }

    
    const RutasFav = () => {
        
      navigate('/favorito', {
        replace: true,
        state: {
          logged: true,
        }
      })     
  }

  const RutasPrest = () => {
        
    navigate('/prestamos', {
      replace: true,
      state: {
        logged: true,
      }
    })     
}

    const booksContainer = {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      };


    return (
        <Layout>
            <div>
            <button className="btn-lista" onClick={RutasFav}><Link to="/favorito"  >Lista de Favoritos</Link></button>             
            <button className="btn-panel" onClick={Rutascre}><Link to="/create"  >Crear Libro</Link></button> 
            <div className="pretsamos">
                <button className="pretsamosboo" onClick={RutasPrest}><Link to="/prestamos">Prestamos</Link></button>
            </div>
            <div style={booksContainer}>
                  {books.map((book) => (
                    <Book key={book.id} item={book} onDelete={handleDelete} onClick={moveBookToCollection}/>
                  ))}
            </div>
            </div>
        </Layout>
    
    );
   
}
