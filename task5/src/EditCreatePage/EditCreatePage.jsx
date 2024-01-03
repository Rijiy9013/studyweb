import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditCreatePage.css";
import SearchBar from "../SearchBar/SearchBar";

function EditCreatePage(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState("");
    const [runtime, setRuntime] = useState("");
    const [rating, setRating] = useState("");
    const [actors, setActors] = useState('');
    const [director, setDirector] = useState('');
    const [genres, setGenres] = useState("");


    async function getMovie() {
        try {
            await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json()).then(
                data => {
                    setMovie(data);
                    setTitle(data.title);
                    setUrl(data.posterUrl);
                    setDescription(data.plot);
                    setYear(data.year);
                    setRuntime(data.runtime);
                    setRating(data.rating);
                    setActors(data.actors.replaceAll(",", ";"));
                    setDirector(data.director);
                    setGenres(data.genres.join("; "));
                }
            );
        } catch (err) {
            console.log("При получении фильма произошла ошибка");
        }
    }

    useEffect(() => {
        if (props.type === "edit") {
            (async () => {
                await getMovie();
            })().catch(error => { console.log("При получении фильма произошла ошибка"); });
        } else {
            setTitle("");
            setUrl("");
            setDescription("");
            setYear("");
            setRuntime("");
            setRating("");
            setActors("");
            setDirector("");
            setGenres("");
        }
    }, [params]);


    function cancel() {
        if (props.type === "edit") {
            navigate(`/movie/${movie.id}`);
        } else {
            navigate("/");
        }
    }


    async function updateMovie() {
        try {
            let movieToSet = {
                title: title,
                year: year,
                runtime: runtime,
                genres: genres.split("; "),
                director: director,
                actors: actors.replaceAll(";", ","),
                plot: description,
                posterUrl: url,
                rating: rating
            };
            if (props.type !== "edit") {
                let allMovies = await fetch(`http://localhost:3004/movies`).then((response) => response.json());
                movieToSet.id = allMovies.length + 1;
            } else {
                movieToSet.id = movie.id;
            }
            let fetchUrl = props.type === "edit" ? `http://localhost:3004/movies/${movie.id}` : `http://localhost:3004/movies`;
            let fetchType = props.type === "edit" ? "PUT" : "POST";
            if (title !== "" && year !== "" && runtime !== "" && genres !== "" && director !== "" && actors !== "" && description !== "" && url !== "" && rating !== "") {
                await fetch(fetchUrl, {
                    method: fetchType,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(movieToSet)
                });
            } else {
                console.log("Введите необходимые поля");
            };
            navigate(`/movie/${movieToSet.id}`);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <SearchBar></SearchBar>
            <div className="column wrapper-form">
                <div className="form-page-wrapper column gap-15-wrapper">
                    <span className="roboto-24">{props.type === "edit" ? "Редактирование" : "Создание"}</span>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Название фильма</span>
                        <input className="search-line input-wrapper-44" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите название фильма"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Год выпуска</span>
                        <input className="search-line input-wrapper-44" type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Введите год выпуска"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Описание</span>
                        <textarea className="search-line input-description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Введите описание"></textarea>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Укажите ссылку на обложку</span>
                        <input className="search-line input-wrapper-44" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Введите ссылку на обложку"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Рейтинг</span>
                        <input className="search-line input-wrapper-44" type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Введите рейтиниг фильма"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Укажите список актеров</span>
                        <input className="search-line input-wrapper-44" type="text" value={actors} onChange={(e) => setActors(e.target.value)} placeholder="Введите актеров (через ;)"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Режиссер</span>
                        <input className="search-line input-wrapper-44" type="text" value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Введите режиссера"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Жанры</span>
                        <input className="search-line input-wrapper-44" type="text" value={genres} onChange={(e) => setGenres(e.target.value)} placeholder="Введите жанры (через ;)"></input>
                    </div>
                    <div className="column gap-8-wrapper">
                        <span className="roboto-16">Длительность</span>
                        <input className="search-line input-wrapper-44" type="text" value={runtime} onChange={(e) => setRuntime(e.target.value)} placeholder="Введите длительность"></input>
                    </div>
                </div>
                <div className="form-footer row-wrap">
                    <div className="row-wrap gap-20-wrapper buttons-wrapper">
                        <button className="search-button" onClick={() => { cancel() }}>Отмена</button>
                        <button className="btn" onClick={() => { updateMovie() }}>Сохранить</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCreatePage;