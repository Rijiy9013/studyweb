import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoviePage.css";
import MainInfo from "./MainInfo";
import MovieHeader from "./MovieHeader";
import MovieDescription from "./MovieDescription";
import SearchBar from "../SearchBar/SearchBar";

function MoviePage() {
    const params = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovie() {
        try {
            await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json()).then(
                data => setMovie(data)
            );
        } catch (err) {
            console.log("При получении фильма произошла ошибка");
        }
    }

    useEffect(() => {
        (async () => {
            await getMovie();
        })().catch(error => { console.log("При получении фильма произошла ошибка"); });
    }, [params]);

    return (
        <>
            {movie && <>
                <SearchBar movieId={params.id}></SearchBar>
                <div className="column movie-main-info-wrapper width-100">
                    <MovieHeader id={params.id}></MovieHeader>
                    <MainInfo movie={movie}></MainInfo>
                    <MovieDescription description={movie.plot} rating={movie.rating}></MovieDescription>
                </div>
            </>}
        </>
    );
}

export default MoviePage;