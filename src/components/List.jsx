import React, { useState, useEffect } from 'react';
import './styles.css';
const List = (props) => {
    const [messCutPersons, setMessCutPersons] = useState([]);
    useEffect(() => {
        fetch('https://mess-server-wnkj.onrender.com/api/messcut/full')
          .then(response => response.json())
          .then(data => {
              setMessCutPersons(data);
          })
          .catch(error => console.log(error));
      }, [props.change]);


      return (
<div class="text-center">
    <h2>Mess Cut Persons</h2>
    <table class="table table-striped table-bordered rounded-corners">
        <thead>
            <tr>
                <th>Sl.no</th>
                <th>Name</th>
                <th>Usercode</th>
                <th>Time</th>
            </tr>
        </thead>
<tbody>
  {messCutPersons.map((person, index) => 

      <tr className="table-success">
        <td>{index+1}</td>
        <td>{person.name.toUpperCase()}</td>
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