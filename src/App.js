import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar';
import UserForm from './components/UserForm';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // your fetch call here
    fetch('https://mess-server-wnkj.onrender.com/api/messcut/full')
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="container"><NavBar /><Loading /></div>;
  }
  return (
    <div className="container">
      <NavBar />
      <UserForm />
    </div>
  )
}

export default App;
