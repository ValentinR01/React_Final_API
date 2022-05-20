import {BlogInterface, FilmsInterface} from "../Interface/ResponsesInterfaces";
import axios from "axios";



export default function useGetRandomFilms() {
    return (): Promise<FilmsInterface[]> => {
        return axios.get('https://api.themoviedb.org/3/discover/movie?api_key=f7ca4c10e4c0b7cafe0cf533d867d146&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
            .then(res => res.data)
    }
}


