import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import {AlertContext} from '../context/alert/alertContext'


export const SignIn = (props) => {
    const history = useHistory()
    const [form, setForm] = useState({
        username : '',
        password: ''
    })

    useEffect(()=> {
        if (localStorage.getItem('UserInfo')) {
            props.updateIsAuthentication(true)
            history.push('/')
        }
    }, [])

    const alert = useContext(AlertContext)

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value })
    }


    const loginHandler = async (e) => {
        e.preventDefault()


        if (form.username !== '' && form.password !== '') {

            const res = await fetch(
                'http://localhost:8000/api/auth/login',
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
                if (response.ok)
                    return response.json()
                else {
                    throw new Error(
                        alert.show('Uncorrect data, please enter the valid data!', 'danger')
                    );
                }
                })


            alert.show('You are logged in successfully!', 'success')
            
            localStorage.setItem('UserInfo', JSON.stringify({
                token: res.token,
                user: res.user
            }))
            props.updateIsAuthentication(true)


            history.push('/')

    
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
                    <h3 className="card-title">Sign in</h3>
                    <p className="card-text text-muted">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                    <form className="needs-validation">
                        <div className="col-12 mb-3">
                            <label htmlFor="username" className="form-label">
                                Username 
                                <span className="text-muted"> (Required)</span>
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
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="invalid-feedback">
                                Your username is required.
                            </div>
                        </div>

                        <div className="col-12 mb-3">
                            <label htmlFor="password" className="form-label">Password 
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
                                    value={form.password}
                                    onChange={changeHandler}       
                                />
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <button 
                            className="btn btn-primary" 
                            type="submit"
                            onClick={loginHandler}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}