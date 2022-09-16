import React, { Component } from 'react';
// import { movies } from './getMovies';
import { BiUpArrow } from 'react-icons/bi';
import { BiDownArrow } from 'react-icons/bi';

const genreId = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currentGenre: 'All Genres',
      movies: [],
      currentText: '',
      limit: 5,
      currPage: 1
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('movies') || '[]');
    const tempArr = [];
    data.forEach((movie) => {
      if (!tempArr.includes(genreId[movie.genre_ids[0]])) {
        tempArr.push(genreId[movie.genre_ids[0]]);
      }
    });
    tempArr.unshift('All Genres');
    this.setState({
      genres: [...tempArr],
      movies: [...data],
    });
  }

  handleGenreChange = (genre) => {
    this.setState({
      currentGenre: genre,
    });
  };

  sortMovieTable = (sortingOrder, sortBy) => {
    const temp = this.state.movies;

    if (sortingOrder === 'desc') {
      temp.sort((objA, objB) => objA[sortBy] - objB[sortBy]);
    } else {
      temp.sort((objA, objB) => objB.popularity - objA.popularity);
    }

    this.setState({ movies: [...temp] });
  };

  handlePageChange = (page) => {
    this.setState({
      currPage: page
    })
  }


  render() {
    let filterArr = [];

    if (this.state.currentText === '') {
      filterArr = this.state.movies;
    } else {
      filterArr = this.state.movies.filter((movie) => {
        const title = movie.original_title.toLowerCase();
        return title.includes(this.state.currentText.toLowerCase());
      });
    }
    if (this.state.currentGenre !== 'All Genres') {
      filterArr = this.state.movies.filter(
        (movie) => genreId[movie.genre_ids[0]] === this.state.currentGenre
      );
    }

    const pages = Math.ceil(filterArr.length/this.state.limit);
    const pageArr = []

    for(let i = 1; i <= pages; i++) pageArr.push(i)

    const startIndex = (this.state.currPage -1) * this.state.limit
    const endIndex = startIndex + this.state.limit
    filterArr = filterArr.slice(startIndex, endIndex)

    return (
      <>
        <div className="main container-fluid">
          <div className="row">
            <div className="col-md-3 p-3 col-sm-12">
              <ul className="list-group">
                {this.state.genres.map((genre) =>
                  this.state.currentGenre === genre ? (
                    <li
                      className="list-group-item"
                      style={{
                        background: '#3f51b5',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                      key={genre}
                      onClick={() => this.handleGenreChange(genre)}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      className="list-group-item"
                      style={{
                        background: 'white',
                        color: 'black',
                        cursor: 'pointer',
                      }}
                      key={genre}
                      onClick={() => this.handleGenreChange(genre)}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="col-md-9 p-3 col-sm-12">
              <div className="row">
                <input
                  type="text"
                  className="input-group-text col"
                  placeholder="Search"
                  value={this.state.currentText}
                  onChange={(e) =>
                    this.setState({ currentText: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="input-group-text col"
                  placeholder="Rows Count"
                  value={this.state.limit}
                  onChange={(e) => this.setState({limit: e.target.value})}
                />
              </div>

              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <BiUpArrow
                          onClick={() =>
                            this.sortMovieTable('asc', 'popularity')
                          }
                        />
                        Popularity
                        <BiDownArrow
                          onClick={() =>
                            this.sortMovieTable('desc', 'popularity')
                          }
                        />
                      </th>
                      <th scope="col">
                        <BiUpArrow
                          onClick={() =>
                            this.sortMovieTable('asc', 'vote_average')
                          }
                        />
                        Rating
                        <BiDownArrow
                          onClick={() =>
                            this.sortMovieTable('desc', 'vote_average')
                          }
                        />
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterArr.map((movie) => {
                      return (
                        <tr key={movie.original_title}>
                          <td>
                            <img
                              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                              alt={movie.title}
                              style={{ width: '3rem', marginRight: '5px' }}
                            />
                            {movie.original_title}
                          </td>
                          <td>{genreId[movie.genre_ids[0]]}</td>
                          <td>{movie.popularity}</td>
                          <td>{movie.vote_average}</td>
                          <td>
                            <button type="button" className="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                {
                  pageArr.map(page => (
                   <li className="page-item"><a className="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                  ))
                }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
