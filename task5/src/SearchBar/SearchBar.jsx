import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.css";
import MovieBar from "./MovieBar";

function SearchBar(props) {
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();

    const [movies, setMovies] = useState(null);

    const [moviesToShow, setMoviesToShow] = useState(null);

    async function getMovies() {
        const fetchedMovies = await fetch(`http://localhost:3004/movies`).then((response) => response.json());
        const favoritesMovies = await fetch(`http://localhost:3004/favorites`).then((response) => response.json());
        console.log(favoritesMovies);
        for (let movie of fetchedMovies) {
            movie.isFavorite = favoritesMovies.some(e => e.id === movie.id);
        }
        console.log(fetchedMovies);
        setMovies(fetchedMovies);
        setMoviesToShow(fetchedMovies);
    }

    function searchByName(nameByFind) {
        setMoviesToShow(movies.filter((movie) => movie.title.includes(nameByFind)));
    }


    useEffect(() => {
        (async () => {
            await getMovies();
        })().catch(error => { console.log("При получении фильмов произошла ошибка"); });
    }, [])


    return (
        <div className="wrapper-0">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <input className="search-line" type="text" placeholder="Введите название фильма" onChange={e => { setSearchString(e.target.value) }}></input>
                    <button className="search-button" onClick={() => { movies && searchByName(searchString) }}>Искать</button>
                </div>
                {moviesToShow && moviesToShow.map((movie) =>
                    <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                        <MovieBar id={movie.id} isFavorite={movie.isFavorite} isSelected={Number(movie.id) === Number(props.movieId)} title={movie.title} year={movie.year} genres={movie.genres}></MovieBar>
                    </Link>
                )}
            </div>
            <div className="movie-bar-footer">
                <div className="footer-wrapper">
                    <span className="footer-text">{`Найдено ${moviesToShow ? moviesToShow.length : 0} фильмов`}</span>
                    <button className="footer-button" onClick={() => navigate('/createMovie')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1C7 0.447715 6.55228 0 6 0Z" fill="#333333" />
                        </svg>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;