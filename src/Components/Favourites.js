import React, { Component } from 'react';
import { movies } from './getMovies';

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
      currentGenre: 'Genres',
    };
  }

  render() {
    const { results: allMovies } = movies;
    const tempArr = [];
    allMovies.forEach((movie) => {
      if (!tempArr.includes(genreId[movie.genre_ids[0]])) {
        tempArr.push(genreId[movie.genre_ids[0]]);
      }
    });
    tempArr.unshift('Genres');
    this.setState({
      genres: [...tempArr],
    });

    return (
      <>
        <div className="main container-fluid">
          <div className="row">
            <div className="col-md-3 p-3 col-sm-12">
              <ul class="list-group">
                {this.state.genres.map((genre) =>
                  this.state.currentGenre === genre ? (
                    <li
                      class="list-group-item"
                      style={{ background: '#3f51b5', color: 'white' }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      class="list-group-item"
                      style={{ background: 'white', color: 'black' }}
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
                />
                <input
                  type="number"
                  className="input-group-text col"
                  placeholder="Rows Count"
                />
              </div>

              <div className="row">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Rating</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMovies.map((movie) => {
                      return (
                        <tr>
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
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
