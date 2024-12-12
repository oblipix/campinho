import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import './styles/global.css';
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ color: 'red' }}>
      <p>Algo deu errado:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTQ2NDlkODBmODE0NWRlN2I3Y2EzOWNiMGE2MjE5OCIsIm5iZiI6MTczMzA5NjEzMC43OTcsInN1YiI6IjY3NGNmMmMyMTNhN2YyZGQzNTgwNGMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rtMBgkPol-5slIu05li-Cshz2RAr48PVoy6VQaOv9qc';

    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/tv?language=pt-BR", {
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
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error("Erro:", error);
      throw error; // Repassa o erro para o ErrorBoundary
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback} 
      onReset={() => {
        // Aqui você pode redefinir o estado ou reexecutar a ação necessária.
        setMovies([]);
        fetchMovies();
      }}
    >
      <div>
        <MovieList movies={movies} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
