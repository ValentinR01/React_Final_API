import { useState, useEffect } from "react";
import axios from "axios";
import {StyledFilmCard} from './Styled/StyledFilmCard'
import {StyledA} from "./Styled/StyledA";


function AllFilms(props) {
    const [filmsList, setfilmsList] = useState([])

    useEffect(() => {
        async function fetchFilms() {
            const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=f7ca4c10e4c0b7cafe0cf533d867d146&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
            try {
                const res = await axios.get(URL);
                console.log(res.data.results);
                setfilmsList(res.data.results);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFilms();
    }, []);


    return (
        <StyledFilmCard>
            {Object.keys(filmsList).map((key, i) => (
                <div>
                    <StyledA href={"/film/" + filmsList[key].id}>
                        <img src={"https://image.tmdb.org/t/p/w500" + filmsList[key].poster_path}/>
                        <h3>{filmsList[key].title}</h3>
                    </StyledA>
                </div>
            ))}
        </StyledFilmCard>
    );

}

export default AllFilms;