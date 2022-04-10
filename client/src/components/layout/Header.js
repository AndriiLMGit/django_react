import React, {useEffect, useState, useContext, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import {AlertContext} from '../../context/alert/alertContext'


export const Header = (props) => {
    const [isAuthentication, setIsAuthentication] = useState(false)
    const [user, setUser] = useState({})
    const history = useHistory()

    const alert = useContext(AlertContext)

    const isAuth = useContext(AuthContext)


    useEffect(() => {
        if (localStorage.getItem('UserInfo')){
            setIsAuthentication(true)
            const info = localStorage.getItem('UserInfo')
            setUser(JSON.parse(info).user)
            history.push('/')
        }

    }, [isAuth])

    const logoutHandler = () => {

        if(localStorage.getItem('UserInfo')) {
            localStorage.removeItem('UserInfo')
            history.push('/login')
            setIsAuthentication(false)
        }
        alert.show('You are logged out successfully!', 'success')
        props.updateIsAuthentication(false)



    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div>
                    <Link className="navbar-brand" to="/">Employees</Link>
                </div>
                <div>
                    <button 
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar"
                        aria-controls="navbarColor03"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                

                <div className="navbar-collapse collapse" style={{ flexGrow: 0 }} id="navbar">
                    <ul className="navbar-nav me-auto">
                        { isAuthentication ? <>
                                <button className="btn">Hello, {user.username} </button>
                                <button 
                                    className="btn btn-primary"
                                    onClick={logoutHandler}
                                >
                                <i className="bi bi-box-arrow-left"></i> Log out</button>
                            </> : <LoggedOut/>  }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const LoggedOut = () => {

    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/signup"><i className="bi bi-person-check-fill"></i> Sign up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login"><i className="bi bi-box-arrow-in-right"></i> Sign in</Link>
            </li>
        </>
    )
}
