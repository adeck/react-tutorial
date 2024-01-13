import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import {API_TOKEN} from "./ApiSecret";
import MovieCard from "./MovieCard";

// Following this tutorial:
//
//  https://www.youtube.com/watch?v=b9eMGE7QtTk
//

const API_URL: string = `https://www.omdbapi.com?apikey=${API_TOKEN}`;

//function App() {
//  return (
function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title: string) => {
        // encodeURIComponent is not in the original tutorial, but
        //  seemed too important to sanitize user input here. Obviously, this
        //  is a toy application, but still.
        const response = await fetch(`${API_URL}&s=${encodeURIComponent(title)}`);
        const data = await response.json();
        setMovies(data.Search);
        console.log(data.Search);
    }
    useEffect(() => {
        // searchMovies('Superman');
    }, [movies]);
    /* So, FilmCow is a play on words. Which I just got, lol. */
    return (
        <div className='App'>
            <h1>CinemaBoeuf</h1>
            <div className={'search'}>
                <input
                    placeholder={'Search'}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
                <img
                    src={SearchIcon}
                    alt={'search'}
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0 ?
                    (<div className={'container'}>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>)
                    : (
                        <div className={"empty"}>
                            <h2>No movies found.</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;
