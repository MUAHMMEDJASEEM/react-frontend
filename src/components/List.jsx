import React, { useState, useEffect } from 'react';

const List = (props) => {
    const [messCutPersons, setMessCutPersons] = useState([]);
    useEffect(() => {
        fetch('https://mess-server-wnkj.onrender.com/api/messcut/full')
          .then(response => response.json())
          .then(data => setMessCutPersons(data))
          .catch(error => console.log(error));
      }, [props.change]);
      return (
        <div>
            <h2>Mess Cut Persons</h2>
            <table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Usercode</th>
            <th>Time</th>
        </tr>
    </thead>
    <tbody>
        {messCutPersons.map(person => 
            <tr key={person._id}>
                <td>{person.name}</td>
                <td>{person.usercode}</td>
                <td>{person.time}</td>
            </tr>
        )}
    </tbody>
</table>
        </div>
    );
}

export default List;