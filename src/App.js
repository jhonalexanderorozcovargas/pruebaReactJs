import logo from './logo.svg';
import './App.css';
import {  useState } from 'react';
import { size } from 'lodash';
import Pagination from './components/Pagination';
import * as utils from './utils/constants';
import Loading from './components/Loading';

function App() {
  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [data, setData] = useState(false);
  const [actualPagina, setActualPagina] = useState(0);
  const [search, setSearch] = useState("");
  const [loading,setLoading] = useState(false)
  const [cantidadRegistros, setCantidadRegistros] = useState(5);

  const filtrarArticulos = () => {
    if(search.length === 0) {
      return productos.slice(actualPagina, actualPagina + cantidadRegistros);
    }else{
      const filtrados = productos.filter(articulo => articulo.title.toLowerCase().includes(search.toLowerCase()));
      return filtrados.slice(actualPagina,actualPagina + cantidadRegistros);
    }
    
  }

  const anteriorPagina = () => {
    if(actualPagina>0){
      setActualPagina(actualPagina - cantidadRegistros);
    }
  }

  const siguientePagina = () => {
    setActualPagina(actualPagina + cantidadRegistros);
  }

  const onSearchChange = (e) => {
    setActualPagina(0);
    setSearch(e.target.value);
  }

  const buscarProducto = async () => {
    if(producto!==""){
      setLoading(true);
      await fetch(utils.baseUrl+utils.search+producto)
      .then((res) => res.json())
      .then((result) => {
        setData(result)
        setProductos(result.data)
      });
      setBusqueda(true);
      setLoading(false);
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
                
                  <button onClick={() => anteriorPagina()}>
                  <i className="fa-solid fa-angle-left" ></i>
                  </button>
                &nbsp;
                <button onClick={() => siguientePagina()}>
                  <i className="fa-solid fa-angle-right" ></i>
                  </button>
                &nbsp;
              <Pagination data={filtrarArticulos()}/>
              <button className='btn btn-primary' onClick={() => setCantidadRegistros(5)}>5</button>
                &nbsp;
              <button className='btn btn-primary' onClick={() => setCantidadRegistros(10)}>10</button>
                &nbsp;
                <button className='btn btn-primary' onClick={() => setCantidadRegistros(20)}>20...</button>
                &nbsp;
            </div>
          )
          }
          {
            loading && <Loading/>
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
