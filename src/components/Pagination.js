import { Component } from "react";
import { useState } from "react";
import Articulo from "./ArticuloModal";

function Pagination(props) {
    const [modal, setModal] = useState(false);
    const [id, setId] = useState("");

    const abrirModal = (id) => {
        setId(id);
        setModal(true);
    }


    return <table className='table'>
            <thead>
            <tr>
                <th>Slug</th>
                <th>Title</th>
                <th>Link</th>
                <th>Headline</th>    
            </tr>
            </thead>
            <tbody>
            {
                props.data.map((prod)=> (
                <tr key={prod.id} onClick={() => abrirModal(prod.id)}>
                    <td>{prod.slug}</td>
                    <td>{prod.title}</td>
                    <td>{prod.link}</td>
                    <td>{prod.headline}</td>
                </tr>
                ))
            }
            {
                modal && <Articulo id={id}/>
            }
            </tbody>
        </table>
}

export default Pagination;