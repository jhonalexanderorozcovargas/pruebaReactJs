import logo from './logo.svg';
import './App.css';
import {  useState } from 'react';
import { size } from 'lodash';
import Pagination from './components/Pagination';
import * as utils from './utils/constants';

function App() {
  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [data, setData] = useState(false);
  const [actualPagina, setActualPagina] = useState(0);
  const [search, setSearch] = useState("");



  const filtrarArticulos = () => {
    if(search.length === 0) {
      return productos.slice(actualPagina,actualPagina + 5);
    }else{
      const filtrados = productos.filter(articulo => articulo.title.includes(search));
      console.log(filtrados)
      return filtrados.slice(actualPagina,actualPagina + 5);
    }
    
  }

  const anteriorPagina = () => {
    if(actualPagina>0){
      setActualPagina(actualPagina - 5);
    }
  }

  const siguientePagina = () => {
    setActualPagina(actualPagina + 5);
  }

  const onSearchChange = (e) => {
    setActualPagina(0);
    setSearch(e.target.value);
  }

  const buscarProducto = async () => {
    if(producto!==""){
      await fetch(utils.baseUrl+utils.search+producto)
      .then((res) => res.json())
      .then((result) => {
        setData(result)
        setProductos(result.data)
      });
      setBusqueda(true);
    }
  }

  return (
    <div className="container mt-5">
      <h1>Productos</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <input 
            type="text" 
            className="form-control"
            placeholder='Ingrese producto'
            onChange={(text) => setProducto(text.target.value)}
            value={producto}
          />
          {
          size(productos) === 0 ? ( 
            busqueda && <span>¡No hay artículos relacionados con el término de búsqueda!</span> 
          ) : (
            <div className='container mt-5'>
              <input
                  type="text"
                  placeholder='Buscar Articulo'
                  className='mb-2 form-control'
                  value={search}
                  onChange={onSearchChange}
                />
                <button className='btn btn-primary' onClick={() => anteriorPagina()}>Anterior</button>
                &nbsp;
                <button className='btn btn-primary' onClick={() => siguientePagina()}>Siguiente</button>
                &nbsp;
              <Pagination data={filtrarArticulos()}/> 
            </div>
          )
          }
        </div>
        <div className='col-2'>
          <button className='btn btn-success' onClick={() => buscarProducto()}>BUSCAR</button>
        </div>
      </div>
    </div>
  );
  
}

export default App;
