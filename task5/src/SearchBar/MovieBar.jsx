import React from "react";
import Star from "../component/Star";

function MovieBar(props) {
    return (
        <div className={`movie-bar ${props.isSelected ? "movie-bar-selected" : ""}`}>
            <div className="row-wrap gap-5-wrapper">
                <span className="movie-name">{props.title}</span>
                <Star id={props.id} isFavorite={props.isFavorite}/>
            </div>
            <span className="movie-info">{`${props.year} | ${props.genres.join(", ")}`}</span>

        </div>
    );
}

export default MovieBar;