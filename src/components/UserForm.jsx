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
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter user code"
        value={userCode}
        onChange={event => setUserCode(event.target.value)}
      />
      <button type="submit">Submit</button>
      {JSON.stringify(userDetails) !== '{}' && (
        <div>
          <h2>User Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>UserCode: {userDetails.usercode}</p>
          <p>MessCut Status: {messCutDetails.messcut ? 'true' : 'false'}</p>
          <button onClick={handleUpdate}>Change Mess Cut Status</button>
        </div>
      )}
    </form>
    <List change={messCutDetails}/></div>
  );
}

export default UserForm;