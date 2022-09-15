import React, { Component } from 'react';
import { movies } from './getMovies';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyPagination from './MyPagination';
import axios from 'axios';

const TOTAL_PAGE = 500;

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: '',
      pArr: [1],
      currPage: 1,
      movies: [],
      favourites: []
    };

    // this.changeMovies = this.changeMovies.bind(this)
    // this.handleRight = this.handleRight.bind(this)
  }

  async componentDidMount() {
    this.changeMovies();
  }

  changeMovies = async() => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d9bcfdc7bc021bbb41adb88706faca65&language=en-US&page=${this.state.currPage}`
    );
    const data = res.data;
    this.setState({ movies: [...data.results] });
  };

  handleRight = () => {
    const tempArr = [];
    for (let i = 1; i <= this.state.pArr.length + 1; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        pArr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handleLeft = () => {
    if(this.state.currPage !== 1) {
      this.setState({
        currPage: this.state.currPage-1
      }, this.changeMovies)
    }
  };

  handleClick = (val) => {
    if(this.state.currPage !== val) {
      this.setState({
        currPage: val
      }, this.changeMovies)
    }
  }

  handleFavourite = (movie) => {
    let oldData = JSON.parse(localStorage.getItem('movies') || "[]");
    if(this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter(m => m.id !== movie.id)
    } else {
      oldData.push(movie)
    }
    localStorage.setItem('movies', JSON.stringify(oldData))
    this.handleFavouriteState()
  }

  handleFavouriteState = () => {
    let oldData = JSON.parse(localStorage.getItem('movies') || "[]");
    let temp = oldData.map(m => m.id)
    this.setState({
      favourites: [...temp]
    })
  }

  render() {
    return (
      <Container className="my-5">
        <h2 className="text-center mb-5">Trending</h2>
        <Row className="gy-3">
          {this.state.movies.map((movie) => {
            return (
              <Col md="3" sm="6" lg="3" key={movie.id}>
                <Card
                  onMouseEnter={() => this.setState({ hover: movie.id })}
                  onMouseLeave={() => this.setState({ hover: '' })}
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{movie.original_title}</Card.Title>
                    <Card.Text>
                      {movie.overview.substring(0, 200) + '...'}
                    </Card.Text>
                    {this.state.hover === movie.id && (
                      <Button variant="primary" onClick={() => this.handleFavourite(movie)}>{this.state.favourites.includes(movie.id) ? 'Remove from favourites' : 'Add to favourites'}</Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="d-flex justify-content-center my-5">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handleLeft}> Previous</a>
              </li>
              {this.state.pArr.map((val) => (
                <li className="page-item" key={val}>
                  <a className="page-link"  onClick={() => this.handleClick(val)}>
                    {val}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" onClick={this.handleRight}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    );
  }
}
