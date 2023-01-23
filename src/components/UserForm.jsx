import React, { useState } from 'react';
import List from './List';
import './styles.css';
function UserForm() {
  const [userCode, setUserCode] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [messCutDetails, setMessCutDetails] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://mess-server-wnkj.onrender.com/api/users/${userCode}`);
    const data = await response.json();
    setUserDetails(data);
    const responseMess = await fetch(`https://mess-server-wnkj.onrender.com/api/messcut/${userCode}`);
    const dataMess = await responseMess.json();
    setMessCutDetails(dataMess);
  }
  const handleUpdate = async () => {
    try {

      const newMessCut = {
        name: userDetails.name,
        usercode: userDetails.usercode,
        messcut: !messCutDetails.messcut,
        time: new Date().toLocaleString()
      }
      const response = await fetch(`https://mess-server-wnkj.onrender.com/api/messcut/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessCut)
      });
      const data = await response.json();
      setMessCutDetails(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
   <div class="d-flex justify-content-center flex-column container">
<form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center">
<label htmlFor="userCode" className="text-muted mr-2 mb-0 label-gap">UserCode</label>
<div className="form-group w-40 mr-2 input-gap">
    <input
        type="number"
        placeholder="Enter UserCode"
        value={userCode}
        onChange={event => setUserCode(event.target.value)}
        className="form-control"
        maxLength={6}
        id="userCode"
    />
</div>
<button type="submit" className="btn btn-primary submit-gap">Submit</button>
</form>

      {JSON.stringify(userDetails) !== '{}' && (
        <div class="text-center">
    <h2>User Details</h2>
    <div className="table-responsive">
    <table className="table table-striped table-bordered" style={{tableLayout: "fixed"}}>
        <thead>
            <tr>
                <th>Name</th>
                <th>UserCode</th>
                <th>MessCut Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{userDetails.name.toUpperCase()}</td>
                <td>{userDetails.usercode}</td>
                <td>
                    {messCutDetails.messcut ? 
                        <i className="fas fa-check text-success"></i> : 
                        <i className="fas fa-times text-danger"></i>
                    }
                </td>
            </tr>
        </tbody>
    </table>
</div>

<button 
    onClick={handleUpdate} 
    className={`btn ${!messCutDetails.messcut ? 'btn-success' : 'btn-danger'} m-2`}
>Change Mess Cut Status</button>
</div>
      )}

      <List change={messCutDetails} class="mt-auto" />
</div>
  );
}

export default UserForm;