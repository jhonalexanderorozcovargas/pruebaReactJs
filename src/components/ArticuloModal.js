import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; 
import * as utils from '../utils/constants';
import Loading from '../components/Loading';

function Articulo(props) {
    const [modal, setmodal] = useState("");
    const [loading,setLoading] = useState(false)
    const [articulo, setarticulo] = useState("")

    useEffect(() => {
      setmodal(true);
      consultarArticulo();
    }, [])


    const consultarArticulo = async ()  => {
    setLoading(true);
      await fetch(utils.baseUrl+utils.searchArticulo+props.id)
      .then((res) => res.json())
      .then((result) => {
        setarticulo(result)
      });
      setLoading(false);
    }
    

    const closeModal = () => {
        setmodal(false);
    }

    return <Modal show={modal} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>{articulo.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
       {loading && <Loading/>} 
      <p>{articulo.headline}</p>
    </Modal.Body>
  </Modal>
}

export default Articulo;