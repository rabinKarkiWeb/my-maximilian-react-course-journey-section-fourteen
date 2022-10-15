import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
    const [movies,setMovies] = useState([]);
    const [isLoding,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const fetchMoviesHandler = async () => {
        try{
            setIsLoading(true);
            const response = await fetch('https://swapi.dev/api/film/');
            if (!response.ok){
                throw new Error("Something went wrong!")
            }
            const data = await response.json();

            const transformedMovies = data.results.map(moviedata => {
                return {
                    id: moviedata.episode_id,
                    title: moviedata.title,
                    openingText: moviedata.opening_crawl,
                    releaseDate: moviedata.release_date,
                }
            });
            setMovies(transformedMovies);
    }
        catch (error) {
            setError(error.message);
        }

        setIsLoading(false)

    }
    let content =  <p>Found no Movies</p>;
    if (movies.length>0){
        content = <MoviesList movies={movies} />;
    }
    if(isLoding){
        content = <h1 style={{color:'darkgreen'}}>Loading data.....</h1>;
    }
    if (error) {
        content = <h1 style={{color:'darkred'}}>{error}</h1>;
    }

        return (
            <React.Fragment>
                <section>
                    <button onClick={fetchMoviesHandler}>Fetch Movies</button>
                </section>
                <section>
                    {content}

                </section>
            </React.Fragment>
        );

}

export default App;
