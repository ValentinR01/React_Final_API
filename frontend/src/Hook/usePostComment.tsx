import {LocalCommentPost} from "../Interface/LocalCommentPost";
import {AxiosInstance} from "../Axios/AxiosInstance";

export default function usePostComment() {
    return (token: string, comment: LocalCommentPost) => {
        return AxiosInstance({
            url: '/post-comment.php',
            method: 'post',
            data: new URLSearchParams({
                title: comment.title,
                content: comment.content,
                rating: comment.rating.toString(),
                imdb_id: comment.imdb_id.toString()
            })
        })
            .then(res => res.data)
    }
}
