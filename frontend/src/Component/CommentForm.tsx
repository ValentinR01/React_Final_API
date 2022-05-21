import React, {useState} from "react";
import {LocalCommentPost} from "../Interface/LocalCommentPost";
import usePostComment from "../Hook/usePostComment";
import {BlogInterface, LoginResponseInterface} from "../Interface/ResponsesInterfaces";
import {StyledButton} from "./Styled/StyledButton";
import {StyledForm} from "./Styled/StyledForm"
import {StyledInput} from "./Styled/StyledInput"
import {useParams} from "react-router-dom";

interface CommentFormPropsInterface {
    loggedUser: LoginResponseInterface,
    setNeedsUpdate: React.Dispatch<boolean>
}

export default function CommentForm({loggedUser, setNeedsUpdate}: CommentFormPropsInterface) {
    const imdb_id = useParams().id;
    const [localComment, setLocalComment] = useState<LocalCommentPost>({
        content: "",
        title: "",
        rating: 5,
        imdb_id: imdb_id
    })
    const postComment = usePostComment();

    const handleChange = ({target}: any) => {
        setLocalComment(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (loggedUser.token != null) {
            postComment(loggedUser.token, localComment)
                .then(data => {
                    console.log(data)
                    setLocalComment({content: "", title: "", rating: 0, imdb_id: ""});
                    setNeedsUpdate(true);
                })
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <h2 >Want to leave a comment ?</h2>
            <div>
                <StyledInput type="text"  placeholder="title"
                       name='title' onChange={handleChange} value={localComment.title}/>

            </div>
            <div >
                <textarea placeholder="Write your comment here !"  name='content'
                          style={{height: '100px', width: '300px', borderRadius: '5px', padding: '1%', border: 'none'}} onChange={handleChange} value={localComment.content}/>

            </div>
            <div>
                <label htmlFor="rating">Rate out of 5</label>
                <br/>
                <select name="rating" onChange={handleChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select></div>
            <StyledButton type='submit' >Send</StyledButton>
        </StyledForm>
    )
}
