import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
const BaseUrl = 'http://ec2-3-95-222-28.compute-1.amazonaws.com:8089/persona';

export default function DataForm() {
    const navigate = useNavigate();
    const inputFirstName = useRef('');
    const inputLastName = useRef('');
    const inputEmail = useRef('');
    const inputPhoneNumber = useRef('');
    const inputSalary = useRef('');
    const inputPosition = useRef('');
    const inputAddress = useRef('');
    const inputOffice = useRef('');
    const inputDependency = useRef('');
    const inputDateAdmission = useRef('');
    const {id} = useParams();
    const [persona, setPersona] = useState({});
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        getPerson();
    }, [update]);
    const getPerson = async () => await fetch(BaseUrl+'/list/'+id,
    { method: 'GET',
      mode: 'cors',
      cache: 'default'
    }).then(res => res.json()).then( persona => setPersona(persona));

    const [onlyRead, setEditable] = useState(true);

    const editEmployee = () =>{
        if(onlyRead){
            setEditable(!onlyRead);
        }
    }

    const saveEmployee = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { firstName: inputFirstName.current.value,
                lastName: inputLastName.current.value,
                email: inputEmail.current.value,
                mobilePhoneNumber: inputPhoneNumber.current.value,
                salary: inputSalary.current.value,
                position: inputPosition.current.value,
                address: inputAddress.current.value,
                office: inputOffice.current.value,
                dependency: inputDependency.current.value,
                dateAdmission: inputDateAdmission.current.value})
        };
        fetch(BaseUrl+'/update/'+id, requestOptions)
        .then((response) => {
            if(!response.ok){
                console.log('Algo salió mal');
            }
        });
        setEditable(!onlyRead);
    }
    
    

    const updateSalary = (event) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(BaseUrl+'/updateSalary/'+id, requestOptions)
        .then((response) => {
            if(!response.ok){
                console.log('Algo salió mal');
            }else{
                setUpdate(!update);
            }
        });
        event.preventDefault();
    }
    
    return(
        <div>
            <form className="m-5">
                <div className="row mb-2">
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="First name" id="First-Name" defaultValue={persona.firstName} readOnly={onlyRead} ref={inputFirstName}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Last name" id="Last-Name" defaultValue={persona.lastName} readOnly={onlyRead} ref={inputLastName}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="email" placeholder="Email" id="Email" defaultValue={persona.email} readOnly={onlyRead} ref={inputEmail}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="number" placeholder="Phone number" id="Phone-number" defaultValue={persona.mobilePhoneNumber} readOnly={onlyRead} ref={inputPhoneNumber}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="number" placeholder="Salary" id="Salary" defaultValue={persona.salary} readOnly={onlyRead} ref={inputSalary}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Position" id="Position" defaultValue={persona.position} readOnly={onlyRead} ref={inputPosition}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Address" id="Address" defaultValue={persona.address} readOnly={onlyRead} ref={inputAddress}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Office" id="Office" defaultValue={persona.office} readOnly={onlyRead} ref={inputOffice}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Dependency" id="Dependency" defaultValue={persona.dependency} readOnly={onlyRead} ref={inputDependency}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="date" placeholder="Admision date" id="Admision-date" defaultValue={persona.dateAdmission} readOnly={onlyRead} ref={inputDateAdmission}/>
                    </div>
                </div>
                <button className="btn btn-primary m-2" onClick={ev => {ev.preventDefault(); editEmployee()}} disabled={!onlyRead}>Editar</button>
                <button className="btn btn-primary m-2" onClick={ev => {ev.preventDefault(); saveEmployee()}} disabled={onlyRead}>Guardar</button>
                <button className="btn btn-primary m-2" onClick={updateSalary}>Actualizar salario</button>
            </form>
        </div>
    );
}