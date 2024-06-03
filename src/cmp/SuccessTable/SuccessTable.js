import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function SuccessTable() {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('https://pivo.onrender.com/subjects')
      .then(function (response) {
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Успеваемость</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Оценка</th>
            <th>Семестр</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value], index) => (
            <tr key={index}>
              <td>{key}</td>
              <td>{value.grade}</td>
              <td>{value.semester}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SuccessTable;
