import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class TeachersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: []
    };
  }

  componentDidMount() {
    axios.get('https://pivo.onrender.com/teachers')
      .then(res => {
        this.setState({ teachers: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { teachers } = this.state;

    return (
      <div>
        <h1>Преподаватели</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ФИО преподавателя</th>
              <th>Название дисциплины</th>
              <th>Название кафедры</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id}>
                <td>{teacher.fullName}</td>
                <td>{teacher.disciplineName}</td>
                <td>{teacher.departmentName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TeachersTable;
