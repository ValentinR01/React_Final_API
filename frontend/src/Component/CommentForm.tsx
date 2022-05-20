import React, {useState} from "react";
import {LocalBlogPost} from "../Interface/LocalBlogPost";
import usePostBlog from "../Hook/usePostBlog";
import {BlogInterface, LoginResponseInterface} from "../Interface/ResponsesInterfaces";
import {StyledButton} from "./Styled/StyledButton";
import {StyledForm} from "./Styled/StyledForm"

interface BlogFormPropsInterface {
    loggedUser: LoginResponseInterface,
    setNeedsUpdate: React.Dispatch<boolean>
}

export default function CommentForm({loggedUser, setNeedsUpdate}: BlogFormPropsInterface) {
    const [localBlog, setLocalBlog] = useState<LocalBlogPost>({content: "", title: ""})
    const postBlog = usePostBlog();

    const handleChange = ({target}: any) => {
        setLocalBlog(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (loggedUser.token != null) {
            postBlog(loggedUser.token, localBlog)
                .then(data => {
                    console.log(data)
                    setLocalBlog({content: "", title: ""})
                    setNeedsUpdate(true);
                })
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <h2 >Want to leave a comment ?</h2>
            <div>
                <input type="text"  placeholder="title"
                       name='title' onChange={handleChange} value={localBlog.title}/>

            </div>
            <div >
                <textarea placeholder="Write here"  name='content'
                          style={{height: '100px'}} onChange={handleChange} value={localBlog.content}/>

            </div>
            <div>
                <label htmlFor="rating">Rate out of 5</label>
                <br/>
                <select name="rating">
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
