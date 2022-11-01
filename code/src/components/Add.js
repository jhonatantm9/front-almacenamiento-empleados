import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const BaseUrl = 'http://ec2-3-95-222-28.compute-1.amazonaws.com:8089/persona';

export default function Add() {
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
    const addEmployee = () =>{
        const requestOptions = {
            method: 'POST',
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
        fetch(BaseUrl+'/save', requestOptions)
        .then((response) => {
            if(!response.ok){
                console.log('Algo salió mal');
            }
            navigate('/list');
        });
    }

    return(
        <div>
            <form className="m-5">
                <div className="row mb-2">
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="First name" id="First-Name" ref={inputFirstName}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Last name" id="Last-Name" ref={inputLastName}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="email" placeholder="Email" id="Email" ref={inputEmail}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="number" placeholder="Phone number" id="Phone-number" ref={inputPhoneNumber}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="number" placeholder="Salary" id="Salary" ref={inputSalary}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Position" id="Position" ref={inputPosition}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Address" id="Address" ref={inputAddress}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Office" id="Office" ref={inputOffice}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input className="form-control me-2" type="text" placeholder="Dependency" id="Dependency" ref={inputDependency}/>
                    </div>
                    <div className="col">
                        <input className="form-control me-2" type="date" placeholder="Admision date" id="Admision-date" ref={inputDateAdmission}/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={ev => {ev.preventDefault(); addEmployee()}}>Agregar</button>
            </form>
        </div>
    );
}