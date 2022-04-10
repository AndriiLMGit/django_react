import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {AlertContext} from '../context/alert/alertContext'


export const SignUp = () => {
    const [form, setForm] = useState({
        username : '',
        email : '',
        password: ''
    })

    const history = useHistory()

    const alert = useContext(AlertContext)

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
    

        if (
            form.username !== '' &&
            form.email !== '' &&
            form.password !== '' &&
            form.password.length >= 8 &&
            form.username.length >= 4
            ) {

            const res = await fetch(
                'http://localhost:8000/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify(form)
                }
            )
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error(
                        alert.show('Uncorrect data, please enter the valid data!', 'danger')
                    )
                }
    
              })

            alert.show('You are signed up successfully!', 'success')
        
            history.push('/login')
        }
        else {
            throw new Error(
                alert.show('Uncorrect data, please enter the valid data!', 'danger')
            )
        }

    }

    return (
        <div className="col-10 col-sm-8 col-md-8 col-lg-6 mx-auto">
            <div className="card mt-5">
                <div className="card-body">
                    <h3 className="card-title">Sign up</h3>
                    <p className="card-text text-muted">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                    <form className="needs-validation">
                        <div className="col-12 mb-3">
                            <label htmlFor="username" className="form-label">
                                Username 
                                <span className="text-muted"> (Optional)</span>
                            </label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-person-fill"></i>
                                </span>
                                <input  
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    required=""
                                    onChange={changeHandler}
                                    value={form.username}
                                />
                            </div>
                            <div className="invalid-feedback">
                            Your username is required.
                            </div>
                        </div>

                        <div className="col-12 mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                                <span className="text-muted"> (Required)</span>
                            </label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-envelope-check-fill"></i>
                                </span>
                                <input 
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Your@example.com"
                                    required=""
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <div className="col-12 mb-3">
                            <label htmlFor="password" className="form-label">
                                Password 
                                <span className="text-muted">(Required)</span>
                            </label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">
                                    <i className="bi bi-key-fill"></i>
                                </span>
                                <input 
                                    type="password" 
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    required=""  
                                    onChange={changeHandler}
                                    value={form.password}     
                                />
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <button 
                            className="btn btn-primary"
                            type="submit"
                            onClick={registerHandler}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}