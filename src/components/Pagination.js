import { Component } from "react";

function Pagination(props) {
    return <table className='table'>
            <thead>
            <tr>
                <th>Slug</th>
                <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {
                props.data.map((prod)=> (
                <tr key={prod.id}>
                    <td>{prod.slug}</td>
                    <td>{prod.title}</td>
                </tr>
                ))
            }
            </tbody>
        </table>
}

export default Pagination;