import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const Create = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [intro, setIntro] = useState("");
    const [completed, setCompleted] = useState(false);   
    const [review, setReview] = useState("");

  
    const navigate = useNavigate();

    const inputStyles = {
      formContainer: {
        width: "400px",
        margin: "0 auto",
      },
      container: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        margin: "15px 0",
      },
      title: {
        fontSize: "16px",
        textAlign: "left",
        color: "black",
      }, 
      input: {
        padding: "10px",
        borderRadius: "5px",
        fontSize: "16px",
      },
    };
     
    function handleChange(e) {

        const name = e.target.name;
        const value = e.target.value;
        
    switch (name) {
          case "title":
            setTitle(value);
            break;
          case "author":
            setAuthor(value);
            break;
          case "intro":
            setIntro(value);
            break;
          case "completed":
            setCompleted(e.target.checked);
            break;
          case "review":
            setReview(value);
            break;

            default: 
        }
      }
    
      function handleSubmit(e) {
        e.preventDefault();
    
        const newBook = {
          id: crypto.randomUUID(),
          title,
          author,
          cover,
          intro,
          completed,
          review,
        };
    
        const booksCollectionRef = collection(db, 'books'); // Cambia 'books' al nombre de tu colección

  // Agrega el nuevo libro a la colección
            addDoc(booksCollectionRef, newBook)
              .then((docRef) => {
                console.log("Libro agregado con ID:", docRef.id);
                navigate('/panel', {
                  replace: true,
                  state: {
                    logged: true,
                  }
                }) 
              })
              .catch((error) => {
                console.error("Error al agregar el libro:", error);
              });
        }
    
      function handleOnChangeFile(e) {
        const element = e.target;
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
          console.log("RESULT", reader.result);
          setCover(reader.result.toString());
        };
        reader.readAsDataURL(file);     
      }
      const RutasPanel = () => {
        
        navigate('/panel', {
          replace: true,
          state: {
            logged: true,
          }
        })
    
      
    }
      const linkStyle = {
        padding: "10px",
        display: "block",
        fontSize: "18px",
      };

   
  return (
    <Layout>
      <button className='btn-create' onClick={RutasPanel}><Link to="/panel"  style={linkStyle}>Libros</Link></button> 
        <div className='card'>
        <form onSubmit={handleSubmit} style={inputStyles.formContainer}>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Titulo</div>
          <input
        
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </div>

        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Autor</div>
          <input      
            type="text"
            name="author"
            onChange={handleChange}
            value={author}
          />
        </div>
      
        <div style={inputStyles.container}>
          <div >Imagen</div>
          <input type="file" name="cover" onChange={handleOnChangeFile} />
          <div>{!!cover ? <img src={cover} width="200" alt='libro'/> : ""}</div>
        </div>

        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Editorial</div>
          <input
            style={inputStyles.input}
            type="text"
            name="intro"
            onChange={handleChange}
            value={intro}
          />
        </div>

        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Prestamos</div>
          <input
            style={inputStyles.input}
            type="checkbox"
            name="completed"
            onChange={handleChange}
            value={completed}
          />
        </div>

        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Tipo de Libro</div>
          <input
            style={inputStyles.input}
            type="text"
            name="review"
            onChange={handleChange}
            value={review}
          />
        </div>

        <input
          type="submit"
          value="Registrar Libro"
          style={{
            padding: "15px 20px",
            minWidth: "200px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#1e9638",
            color: "white",
            fontWeigth: "bolder",
            fontSize: "18px",
          }}
        />
      </form>
        </div>
       
    </Layout>
    
  )
}

export default Create;
