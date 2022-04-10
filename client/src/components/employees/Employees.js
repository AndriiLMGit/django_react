import React, {useState, useEffect} from 'react';


export const Employees = (data) => {
    const [dataF, setDataF] = useState([])
    const token = JSON.parse(localStorage.getItem('UserInfo')).token


    useEffect(()=> {
        fetch(
          'http://localhost:8000/api/employees/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Token ${token}`
                }
            }
        )
        .then(response => {return response.json()})
        .then(fetchedData => {setDataF(fetchedData)})
    
    
      }, [data])

    const removeEmployeeItem = async id => {
        await fetch(`http://localhost:8000/api/employees/${id}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Token ${token}`
                },
            }
        )
        .then(setDataF(dataF.filter(emp => emp.id !== id)))
        
    }

    return (
        <div className="col-10 col-sm-10 col-md-10 col-lg-9 mx-auto mt-5">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { dataF.length ? dataF.map(employeer => 
                        <tr key={employeer.id} className="alignment">
                            <th scope="row">{employeer.id}</th>
                            <td>{employeer.name}</td>
                            <td>{employeer.email}</td>
                            <td>{employeer.bio}</td>
                            <td>{new Date(employeer.created_at).toLocaleTimeString()}</td>
                            <td>
                                <button 
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        removeEmployeeItem(employeer.id)
                                        }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ) : <tr>
                            <th>There are no employees yet!</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}