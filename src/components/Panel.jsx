import { useAppContext } from "../store/store";
import {Link, useNavigate} from "react-router-dom";
import Layout from "./Layout";
import Book from "./Book";

export default function Panel(){
    const store = useAppContext();
    const navigate = useNavigate();

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

    const booksContainer = {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      };

      const linkStyle = {
        padding: "10px",
        display: "block",
        fontSize: "18px",
      };

    return (
        <Layout>
            <div style={booksContainer}>
            <button className="btn-lista" onClick={RutasFav}><Link to="/favorito"  style={linkStyle}>Lista de Favoritos</Link></button>             
            <button className="btn-panel" onClick={Rutascre}><Link to="/create"  style={linkStyle}>Crear Libro</Link></button> 
                
                {store.items.map((item) => (
                <Book key={item.id} item={item}/>
                ))}
            </div>
        </Layout>
    
    );
   
}
