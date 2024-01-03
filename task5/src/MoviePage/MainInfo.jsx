import React from "react";

function MainInfo(props) {
    function getDuration(duration) {
        return `${Math.floor(duration / 60)} ч. ${duration % 60} м.`;
    }

    function getActors(actorsString) {
        let content = [];
        let splitted = actorsString.split(", ");
        let size = splitted.length > 4 ? 4 : splitted.length;
        for (let i = 0; i < size; ++i) {
            content.push(
                <span key={splitted[i]} className="roboto-16">{splitted[i]}</span>
            );
        }
        return content;
    }

    return (
        <div className="main-info-wrapper width-100">
            <img src={props.movie.posterUrl} alt={`${props.movie.title} poster`} />
            <div className="column gap-20-wrapper width-100">
                <div className="column gap-5-wrapper">
                    <span className="roboto-24">{props.movie.title}</span>
                    <span className="roboto-16 fv-500 gray-color">{props.movie.director}</span>
                </div>
                <div className="sub-info-wrapper width-100">
                    <div className="column gap-5-wrapper">
                        <span className="roboto-16 fv-500">Параметры</span>
                        <div className="row-wrap gap-15-wrapper">
                            <span className="roboto-16 gray-color">Продолжительность</span>
                            <span className="roboto-16">{getDuration(props.movie.runtime)}</span>
                        </div>
                        <div className="row-wrap gap-15-wrapper">
                            <span className="roboto-16 gray-color">Жанры</span>
                            <span className="roboto-16">{props.movie && props.movie.genres.join(", ")}</span>
                        </div>
                        <div className="row-wrap gap-15-wrapper">
                            <span className="roboto-16 gray-color">Год производства</span>
                            <span className="roboto-16">{props.movie.year}</span>
                        </div>
                    </div>
                    <div className="column gap-15-wrapper">
                        <div className="actors-title">
                            <span className="roboto-16 fv-500">В главных ролях </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="15" viewBox="0 0 7 15" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.5256 14.2071C1.1766 14.5976 0.610753 14.5976 0.261751 14.2071C-0.0872504 13.8166 -0.0872504 13.1834 0.261751 12.7929L4.99188 7.5L0.261751 2.20711C-0.0872504 1.81658 -0.0872504 1.18342 0.261751 0.792893C0.610753 0.402369 1.1766 0.402369 1.5256 0.792893L6.25572 6.08579C6.95373 6.86683 6.95373 8.13316 6.25572 8.91421L1.5256 14.2071Z" fill="#333333" />
                            </svg>
                        </div>
                        <div className="column gap-10-wrapper">
                            {getActors(props.movie.actors)}
                            {props.movie.actors.length > 4 ? <span className="all-actors roboto-16">{`Остальные ${props.movie.actors.length - 4} актера`}</span> : <>F</>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainInfo;