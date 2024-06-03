import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function TeachersTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.get('https://pivo.onrender.com/teachers')
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
            <h1>Преподаватели</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Кафедра</th>
                    <th>Предмет</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.fio}</td> {/* Render the teacher's full name */}
                        <td>{item.department}</td> {/* Render the teacher's department */}
                        <td>{item.sub_name}</td> {/* Render the teacher's subject */}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TeachersTable;