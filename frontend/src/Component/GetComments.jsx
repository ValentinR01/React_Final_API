import { useState, useEffect } from "react";
import axios from "axios";
import {StyledFilmCard} from './Styled/StyledFilmCard'
import {StyledA} from "./Styled/StyledA";
import {StyledCommentCard} from "./Styled/StyledCommentCard";


function GetComments(props) {
    const film_id = props.film_id
    const [comments, setcomments] = useState([])


    useEffect(() => {
        async function fetchComments() {
            const URL = 'http://localhost:2345/get-comments.php?imdb_id=' + film_id;
            try {
                const res = await axios.get(URL, {withCredentials: true});
                setcomments(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchComments();
    }, []);
    console.log(comments)

    if (comments.length) {
        return  (
            <>
            <h2>Comments :</h2>
                {Object.keys(comments).map((key, i) => (
                    <StyledCommentCard>
                        <h3>{comments[key].title}</h3>
                        <span>{comments[key].rating}/5</span>
                        <h5>{comments[key].commment}</h5>
                    </StyledCommentCard>
                ))}
            </>
        )
    }
    else {
        return (
            <h3>0 comments.</h3>
        )
    }




}

export default GetComments;