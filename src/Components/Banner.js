import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { movies } from './getMovies';

export default class Banner extends Component {
  render() {
    const { results: allMovies } = movies;
    const bannerPic = allMovies[0];

    return (
      <Card style={{ width: '100%', border: 0 }}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/original${bannerPic.backdrop_path}`}
          style={{ borderRadius: 0 }}
        />
      </Card>
    );
  }
}
