import React from "react";

function MovieDescription(props) {
    function getRatingColor(rating) {
        if (rating >= 7.0)
            return "green-color";
        if (rating <= 4.0)
            return "red-color";
        return "gray-color";
    }

    return (
        <>
            <span className="roboto-20 description-title">Описание</span>
            <span className="roboto-16">{props.description}</span>
            <div className="row-wrap rating">
                <span className="roboto-16 fv-500">Текущий рейтинг</span>
                <span className={`roboto-32 ${getRatingColor(props.rating)}`}>{props.rating}</span>
            </div>
        </>
    );
}

export default MovieDescription;