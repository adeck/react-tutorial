import React from "react";

function MovieCard(props:{movie:{Year:string, Title:string, Poster:string, Type:string}}) {
    const movie = props.movie;
    return (
        <div className={'movie'}>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={posterSrc(movie.Poster)}
                     alt={movie.Title}
                />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
}

function posterSrc(s: string) : string {
    return s === 'N/A' ? 'https://via.placeholder.com/400' : s;
}

export default MovieCard;
