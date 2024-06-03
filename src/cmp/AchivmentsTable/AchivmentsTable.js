import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import FormControl from 'react-bootstrap/FormControl';

function AchievementsTable() {
    const [achievements, setAchievements] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.get('https://pivo.onrender.com/achievements')
            .then(res => {
                console.log(res);
                setAchievements(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    }

    const filteredAchievements = achievements.filter(achievement =>
        achievement.describe.toLowerCase().includes(search.toLowerCase())
    );
    const displayedAchievements = selectedType === 'all' ? filteredAchievements : filteredAchievements.filter(achievement => achievement.type === selectedType || achievement.describe.toLowerCase().includes('активность'.toLowerCase())); // Update the filtering logic to include "активность"

    function getVariant(type) {
        switch (type) {
            case 'политика':
                return 'primary';
            case 'наука':
                return 'success';
            case 'активность': // Add a new case for "активность"
                return 'warning';
            default:
                return 'secondary';
        }
    }

    return (
        <div>
            <h1>Личные достижения</h1>
            <FormControl
                type="text"
                placeholder="Поиск"
                value={search}
                onChange={handleSearchChange}
            />
            <FormControl as="select" value={selectedType} onChange={handleTypeChange}>
                <option value="all">Все</option>
                <option value="политика">Политика</option>
                <option value="наука">Наука</option>
                <option value="активность">Активность</option> {/* Add the "активность" option */}
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
                        <td>{achievement.date.toString()}</td> {/* Convert the date to a string */}
                        <td><Badge pill variant={getVariant(achievement.type)}>{achievement.type}</Badge></td>
                        <td>{achievement.describe}</td> {/* Use 'describe' instead of 'description' */}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AchievementsTable;
