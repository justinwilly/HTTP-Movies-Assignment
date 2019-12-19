import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
title: "",
director: "",
metascore: "",
stars: []
};

const UpdateForm = props => {
const [movie, setMovie] = useState(initialMovie);

const handleChanges = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
    value = value.split(",");
    }
    setMovie({
    ...movie,
    [e.target.name]: value
    });
};

useEffect(() => {
    console.log(props);
    axios
    .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
    .then(res => setMovie(res.data))
    .catch(err => console.log(err));
}, [props.match.params.id]);

const handleSubmit = e => {
    e.preventDefault();
    axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
        props.history.push(`/movies/${movie.id}`);
        })
        .catch(err => console.log(err));
};

return (
    <div>
    <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChanges}
        value={movie.title}
        />
        <label>Director:</label>
        <input
        type="text"
        name="director"
        placeholder="Director"
        onChange={handleChanges}
        value={movie.director}
        />
        <label>Metascore:</label>
        <input
        type="text"
        name="metascore"
        placeholder="Metascore"
        onChange={handleChanges}
        value={movie.metascore}
        />
        <label>Stars:</label>
        <input
        type="text"
        name="stars"
        placeholder="Stars"
        onChange={handleChanges}
        value={movie.stars}
        />
        <button>Update Movie</button>
    </form>
    </div>
);
};

export default UpdateForm;