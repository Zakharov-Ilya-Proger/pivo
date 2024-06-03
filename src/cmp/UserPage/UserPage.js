import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function UserPage() {
    const [user, setUser] = useState();
    const [group, setGroup] = useState();

    useEffect(() => {
        const userFio = localStorage.getItem('userFio');
        const userGroup = localStorage.getItem('userGroup')

        setUser(userFio);
        setGroup(userGroup);
    }, []);


    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{user}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Группа: {group}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserPage;
