import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
const BaseUrl = 'http://ec2-3-95-222-28.compute-1.amazonaws.com:8089/persona';



export default function List({color}) {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    useEffect(() => {
        listPersonas()
    }, []);

    const listPersonas = () => {
        fetch(BaseUrl+'/listAll')
        .then(res => res.json())
        .then(personas => setPersonas(personas))
        
    }
    const deletePersona = (e) => {  
        const id = e.target.parentNode.parentNode.parentNode.getAttribute('id');
        const result = window.confirm('¿Seguro que deseas eliminar al emleado con id:'+id);
        if(result){
            fetch(BaseUrl+'/delete/'+id, {method: 'DELETE'})
            .then((response) => {
                if(!response.ok){
                    console.log('Algo salió mal');
                }
                listPersonas();
                navigate('/');
            });
        }
    }
    const searchPersona = (id) => {
        fetch(BaseUrl+'/list/'+id)
            .then(res => res.json())
            .then(personas => setPersonas([personas]))
    }

    return (
    <div className="container my-5">
        <form className="d-flex my-4" style={{maxWidth:"15%",minWidth:"160px"}} role="search" >
            <input className="form-control me-2" onChange={({target}) => !!target.value ? searchPersona(target.value) : listPersonas()} type="search" placeholder="Search" aria-label="Search" id="Search" />
        </form>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Salario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                personas.map(persona => (
                                    <tr key={persona.idPerson} id={persona.idPerson}>
                                        <td>{persona.idPerson}</td>
                                        <td>{persona.firstName}</td>
                                        <td>{persona.lastName}</td>
                                        <td>{persona.email}</td>
                                        <td>{persona.mobilePhoneNumber}</td>
                                        <td>{persona.salary }</td>
                                        <td>
                                            <Link to={`/data/${persona.idPerson}`} className="btn btn-primary m-1">
                                                <i className="bi bi-folder2-open"></i>
                                            </Link>
                                            <button type="button" className="btn btn-primary m-1" onClick={deletePersona}>
                                                <i className="bi bi-trash3-fill"></i>
                                            </button>                                            
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);}