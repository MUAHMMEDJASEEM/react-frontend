import React, { useState } from 'react';
import List from './List';
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
   <div class="d-flex justify-content-center flex-column">
      <form onSubmit={handleSubmit} class="form-inline d-flex mx-auto">
      <input
          type="text"
          placeholder="UserCode"
          value={userCode}
          onChange={event => setUserCode(event.target.value)}
          class="form-control col"
          maxLength={10}
        />
        <button type="submit" class="btn btn-primary">Submit</button>
       
      </form>
      {JSON.stringify(userDetails) !== '{}' && (
        <div class="text-center">
    <h2>User Details</h2>
    <p>Name: {userDetails.name}</p>
    <p>UserCode: {userDetails.usercode}</p>
    <p>MessCut Status: {messCutDetails.messcut ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</p>
    <button onClick={handleUpdate} class="btn btn-success">Change Mess Cut Status</button>
</div>
      )}
      <List change={messCutDetails} class="mt-auto" />
</div>
  );
}

export default UserForm;