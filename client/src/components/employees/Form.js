import React, {useState, useContext, useEffect} from 'react';
import {AlertContext} from '../../context/alert/alertContext'


export const Form = (props) => {
    const [form, setForm] = useState({
        name : "",
        email : "",
        bio : ""
    })

    const token = JSON.parse(localStorage.getItem('UserInfo')).token

    const alert = useContext(AlertContext)


    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const submitHandler = async () => {

        if (form.name !== '' && form.email !== '' && form.bio !== '') {

            const res = await fetch(
                'http://localhost:8000/api/employees/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Token ${token}`
                    },
                    body: JSON.stringify(form)
                }
            )
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error(
                        alert.show('Uncorrect data, please enter the valid data!', 'danger')
                    );
                }
                })


            alert.show('Employeer has been created successfully! ', 'success')

    
        }
        else {
            throw new Error(
                alert.show('Uncorrect data, please enter the valid data!', 'danger')
                
            )
        }
        props.updateData(form)
        setForm({
            name : "",
            email : "",
            bio : ""
        })
    }


    return (
        <>
        <div className="col-10 col-sm-8 col-md-8 col-lg-6 mx-auto">
            <div className="card mt-5">
                <div className="card-body">
                    <h3 className="card-title">Add employeer</h3>
                    <p className="card-text text-muted">With supporting text below as a natural lead-in to additional content.</p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input 
                            type="name"
                            name="name"
                            className="form-control"
                            id="exampleInputName"
                            aria-describedby="nameHelp"
                            value={form.name}
                            onChange={changeHandler}
                        />
                    <div id="nameHelp" className="form-text">We'll never share your data with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input   
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                    <textarea 
                        className="form-control"
                        name="bio"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={form.bio}
                        onChange={changeHandler}
                    >
                    </textarea>
                </div>
                <button 
                    type="submit"
                    className="btn btn-primary"
                    onClick={submitHandler}
                >
                    Submit
                </button>
            </div>
            </div>
        </div>
        </>
    )
}