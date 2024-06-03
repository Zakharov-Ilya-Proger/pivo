import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import FormControl from 'react-bootstrap/FormControl';

class AchievementsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      search: '',
      selectedType: 'all'
    };
  }

  componentDidMount() {

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;

    axios.get('https://pivo.onrender.com/achievements')
      .then(res => {
        console.log(res);
        this.setState({ achievements: res.data });
      })
      .catch(err => console.log(err));
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  handleTypeChange = (e) => {
    this.setState({ selectedType: e.target.value });
  }

  render() {
    const { achievements, search, selectedType } = this.state;
    const filteredAchievements = achievements.filter(achievement =>
      achievement.description.toLowerCase().includes(search.toLowerCase())
    );
    const displayedAchievements = selectedType === 'all' ? filteredAchievements : filteredAchievements.filter(achievement => achievement.type === selectedType);

    return (
      <div>
        <h1>Личные достижения</h1>
        <FormControl
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={this.handleSearchChange}
        />
        <FormControl as="select" value={selectedType} onChange={this.handleTypeChange}>
          <option value="all">Все</option>
          <option value="учеба">Учеба</option>
          <option value="спорт">Спорт</option>
          <option value="наука">Наука</option>
        </FormControl>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Вид</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {displayedAchievements.map(achievement => (
              <tr key={achievement.id}>
                <td>{achievement.date}</td>
                <td><Badge pill variant={getVariant(achievement.type)}>{achievement.type}</Badge></td>
                <td>{achievement.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function getVariant(type) {
  switch (type) {
    case 'учеба':
      return 'primary';
    case 'спорт':
      return 'success';
    case 'наука':
      return 'warning';
    default:
      return 'secondary';
  }
}

export default AchievementsTable;
