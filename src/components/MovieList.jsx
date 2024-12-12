import React, { useState, useEffect } from 'react';
//import App from './App';
import '/src/styles/card.css';

const MovieList = ({ genre, movies, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const moviesPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + moviesPerPage) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - moviesPerPage + movies.length) % movies.length);
  };

  const displayedMovies = movies.slice(currentIndex, currentIndex + moviesPerPage);

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    try {
      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=fa4649d80f8145de7b7ca39cb0a62198&language=pt-BR`
      );
      const trailerData = await trailerResponse.json();
      if (trailerData.results?.length > 0) {
        setTrailer(trailerData.results[0].key);
      } else {
        setTrailer(null);
      }
      document.body.classList.add('modal-open');
    } catch (error) {
      console.error('Erro ao buscar trailer:', error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.classList.remove('modal-open');
  };

  return (
    <div id={id} className="movie-list-container">
      <h2 className="movie-list-title">{genre.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>

      <div className="movie-list">
        <button className="arrow arrow-left" onClick={prevSlide}>&#10094;</button>
        <div className="movie-cards">
          {displayedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h2 className="movie-title">{movie.original_title}</h2>
              <img
                className="movie-poster"
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path}`}
                alt={`Poster do filme ${movie.original_title}`}
              />
              <p className="movie-description" onClick={() => handleMovieClick(movie)}>
                {movie.overview.slice(0, 50)}...
              </p>
            </div>
          ))}
        </div>
        <button className="arrow arrow-right" onClick={nextSlide}>&#10095;</button>
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            {trailer ? (
              <iframe
                className="modal-trailer"
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer}?modestbranding=1&rel=0&showinfo=0&autohide=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p>Trailer não disponível</p>
            )}
            <div className="modal-text">
              <h2>{selectedMovie.original_title}</h2>
              <p><strong>Gênero:</strong> {genre}</p>
              <p><strong>Ano:</strong> {selectedMovie.release_date.split('-')[0]}</p>
              <p><strong>Nota:</strong> {selectedMovie.vote_average}/10</p>
              <p><strong>Descrição:</strong> {selectedMovie.overview}</p>
            </div>
            <img className="modal-gif" src="./src/img/transparent-mj.gif" alt="Animação" />
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [trendingMovies, setTrendingMovies] = useState([]);

  const genres = {
    terror: 27,
    comedia: 35,
    comediaRomantica: 10749,
    drama: 18,
    acao: 28,
    aventura: 12,
    romantico: 10749,
  };

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const results = await Promise.all(
          Object.entries(genres).map(async ([key, genreId]) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=fa4649d80f8145de7b7ca39cb0a62198&language=pt-BR&with_genres=${genreId}`
            );
            const data = await response.json();
            return [key, data.results];
          })
        );
        setMoviesByGenre(Object.fromEntries(results));
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=fa4649d80f8145de7b7ca39cb0a62198&language=pt-BR`
        );
        const data = await response.json();
        setTrendingMovies(data.results || []);
      } catch (error) {
        console.error('Erro ao buscar tendências:', error);
      }
    };

    fetchMoviesByGenre();
    fetchTrendingMovies();
  }, []);

  return (
    <div className="home-page">
      <MovieList id="trending" genre="Tendências" movies={trendingMovies} />
      {Object.entries(moviesByGenre).map(([key, movies]) => (
        <MovieList key={key} id={key} genre={key} movies={movies || []} />
      ))}
    </div>
  );
};

export default HomePage;
