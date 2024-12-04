import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import './styles/global.css';

function App() {
  const [movies, setMovies] = useState([]);

  // Função para buscar os filmes
  const fetchMovies = async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTQ2NDlkODBmODE0NWRlN2I3Y2EzOWNiMGE2MjE5OCIsIm5iZiI6MTczMzA5NjEzMC43OTcsInN1YiI6IjY3NGNmMmMyMTNhN2YyZGQzNTgwNGMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rtMBgkPol-5slIu05li-Cshz2RAr48PVoy6VQaOv9qc';

    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=pt-BR", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar filmes.");
      }

      const data = await response.json();

      // Atualiza o estado com os filmes retornados
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Hook useEffect para chamar fetchMovies ao carregar o componente
  useEffect(() => {
    fetchMovies();
  }, []); // O array vazio significa que isso será executado apenas uma vez

  return (
    <div>
      {/* Passa os filmes para o componente MovieList */}
      <MovieList movies={movies} />
    </div>
  );
}







export default App;
