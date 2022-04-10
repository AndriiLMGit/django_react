import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Header} from './components/layout/Header'
import {Form} from './components/employees/Form'
import {Employees} from './components/employees/Employees'
import {Alert} from './components/employees/Alert'
import { AlertState } from './context/alert/AlertState'
import {SignUp} from './pages/SignUp'
import {SignIn}from './pages/SignIn'
import {Start} from './components/layout/Start'
import Context from './context/context'
import "bootstrap-icons/font/bootstrap-icons.css";
import './css/Custom.css'
import AuthContext from './context/AuthContext';

function App() {
  const [isAuthentication, setIsAuthentication] = useState(false)
  const [data, setData] = useState([])

  const updateData = (value) => {
    setData([...data, value])
  }

  const updateIsAuthentication = (isAuth) => {
    setIsAuthentication(isAuth)
  }

  useEffect(()=> {
    if (localStorage.getItem('UserInfo')) {
        setIsAuthentication(true)
    }
  }, [])

  const removeEmployee = (id) => {
    setData(data.filter(emp => emp.id !== id))

  }

  return (
    <AuthContext.Provider value={isAuthentication}> 
    <Context.Provider value={{removeEmployee}}>
      <Router>
        <AlertState>
        
          <Switch>
            <Route path="/" exact>
              { isAuthentication ?
              <> 
                <Header updateIsAuthentication={updateIsAuthentication}/>
                <Alert/>
                <Form updateData={updateData}/>
                <Employees data={data} removeEmployee={removeEmployee}/>
              </> :
              <>
                <Start/>
              </>
              }
            </Route>
            <Route path="/signup" exact>
              <Header updateIsAuthentication={updateIsAuthentication}/>
              <Alert/>
              <SignUp/>
            </Route>
            <Route path="/login" exact>
              <Header updateIsAuthentication={updateIsAuthentication}/>
              <Alert/>
              <SignIn updateIsAuthentication={updateIsAuthentication} />
            </Route>
          </Switch>
        </AlertState>
      </Router>
    </Context.Provider>
    </AuthContext.Provider> 
  );
}

export default App;
