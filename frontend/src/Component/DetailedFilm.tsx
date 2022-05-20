import {useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import {StyledDetailledDisplay} from './Styled/StyledDetailledDisplay'
import GetComments from "./GetComments";
import CommentForm from "./CommentForm";

export default function DetailsPage () {
    const id = useParams().id
    const [film, setfilm] = useState([])

    useEffect(() => {
        async function fetchFilms() {
            const URL = "https://api.themoviedb.org/3/movie/" + id + "?api_key=f7ca4c10e4c0b7cafe0cf533d867d146&language=en-US";
            try {
                const res = await axios.get(URL);
                console.log(res);
                setfilm(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFilms();
    }, []);

        return(
            <>
            <StyledDetailledDisplay>
                <img src={"https://image.tmdb.org/t/p/w500" + film.poster_path}/>
                <div>
                    <h2>{film.title}</h2>
                    <h3>Release date : {film.release_date}</h3>
                    <h3>Description : {film.overview}</h3>
                </div>
            </StyledDetailledDisplay>
            <GetComments film_id={id}></GetComments>
                <CommentForm></CommentForm>
            </>
        )
}