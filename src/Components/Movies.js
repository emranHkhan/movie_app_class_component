import React, { Component } from 'react';
import { movies } from './getMovies';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Movies extends Component {
  render() {
    const { results: allMovies } = movies;
    console.log(allMovies);
    return (
      <Container className="my-5">
        <h2 className="text-center mb-5">Trending</h2>
        <Row>
          {allMovies.map((movie) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }} className="mx-auto mb-5">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{movie.original_title}</Card.Title>
                    <Card.Text>
                     {movie.overview}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}
