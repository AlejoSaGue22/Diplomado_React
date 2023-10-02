import Swal from 'sweetalert2';



export default function Book({item}) {
    const bookContainerStyle = {
        display: "flex",
        flexDirection: "column",
        width: "300px",
      };
      
      
      



    
  const agregarLocalStorage = () => {
    // Convierte el objeto 'item' a una cadena JSON
    const itemJSON = JSON.stringify(item);

    localStorage.setItem("miItemFavorito", itemJSON);


    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Libro Agregado como Favorito',
        showConfirmButton: false,
        timer: 1500
      })
  };

    return(
        <div style={bookContainerStyle}>
            <div className="card">
                <img src={item.cover} width="200" alt={item.title}/>
                <div className="bottom">
                    <div className="title">{item.title}</div>
                    <button className="amount" onClick={agregarLocalStorage}> <i className='bx bx-bookmark-plus'></i> Añadir Favoritos</button>    
                </div>
                </div>
            
        </div>
    );
}