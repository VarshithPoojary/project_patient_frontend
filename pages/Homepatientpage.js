import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


const CardComponent = () => {
  const cardData = [
    { imgSrc: 'https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookhelathcheck_icon.svg', text: 'Book Health Check-Up' },
    { imgSrc: 'https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookhelathcheck_icon.svg', text: 'Book Health Check-Up' },
    { imgSrc: 'https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/buymedicines_icon.svg', text: 'Consult Online' },
    { imgSrc: 'https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/consultonline_icon.svg', text: 'Buy Medicine' }
  ];

  return (
    <Container className="main-card mt-5">
      <Card className="p-3">
        <Row className="d-flex justify-content-between">
          {cardData.map((card, index) => (
            <Col key={index} className="small-card">
              <Card className="text-center p-3">
                <img src={card.imgSrc} alt="icon" className="mb-2" />
                <Card.Text>{card.text}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Container>
  );
};

export default CardComponent;
