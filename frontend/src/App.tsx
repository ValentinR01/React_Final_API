import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import useLogin from "./Hook/useLogin";
import {BlogInterface, FilmsInterface, LoginResponseInterface} from "./Interface/ResponsesInterfaces";
import {LocalUserInterface} from "./Interface/LocalUserInterface";
import LoginForm from "./Component/LoginForm";
import HideIfLogged from "./Component/HideIfLogged";
import useRegister from "./Hook/useRegister";
import useGetBlogList from "./Hook/useGetRandomFilms";
import BlogList from "./Component/BlogList";
import HideIfNotLogged from "./Component/HideIfNotLogged";
import BlogForm from "./Component/BlogForm";
import useGetCookies from "./Hook/useGetCookies";
import useEraseCookie from "./Hook/useEraseCookie";
import {StyledHeader} from './Component/Styled/StyledHeader';
import {StyledH1} from './Component/Styled/StyledH1';
import {StyledButton} from './Component/Styled/StyledButton'
import {StyledA} from './Component/Styled/StyledA'
import {BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import useGetRandomFilms from './Hook/useGetRandomFilms';
import {StyledFilmGrid} from './Component/Styled/StyledFilmGrid';
import DetailsPage from './Component/DetailedFilm'

import axios from "axios";
import AllFilms from "./Component/AllFilms";

export default function App() {
    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
    const [blogList, setBlogList] = useState<BlogInterface[]>([])
    const [filmsList, setfilmsList] = useState<FilmsInterface[]>([])
    // Determines if the user wants to LogIn or to Register
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    const login = useLogin();
    const register = useRegister();
    const getBlogList = useGetBlogList();
    const getFilmList = useGetRandomFilms()
    const cookies = useGetCookies();
    const eraseCookie = useEraseCookie();

    useEffect(() => {
        if (Object.keys(cookies).includes('hetic_token') && Object.keys(cookies).includes('hetic_username')) {
            console.log('got cookies !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: cookies.hetic_username,
                token: cookies.hetic_token
            }))
        }
    }, [])

    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        }
    }, [localUser])



    useEffect(() => {
        getFilmList()
            .then(data => {
                setfilmsList(data)
            })
    }, [])
    console.log(filmsList)

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });
        eraseCookie();
    }



    return (
        <>
            <StyledHeader>
                <StyledH1>
                    <StyledA href="/">IMDB</StyledA>
                </StyledH1>
                


                <HideIfLogged loggedUser={loggedUser}>
                    <StyledButton>
                        <StyledA href="/login">Login</StyledA>
                    </StyledButton>
                </HideIfLogged>

                <HideIfNotLogged loggedUser={loggedUser}>
                    <StyledButton>
                        <StyledA onClick={handleDisconnect}>Logout</StyledA>
                    </StyledButton>
                </HideIfNotLogged>


            </StyledHeader>

            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={
                            <StyledFilmGrid>
                                <AllFilms/>
                            </StyledFilmGrid>
                        }/>
                        <Route path="login" element={
                            <>
                                <HideIfNotLogged loggedUser={loggedUser}>
                                    <Navigate replace to="/" />
                                </HideIfNotLogged>
                                <HideIfLogged loggedUser={loggedUser}>
                                    <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
                                </HideIfLogged>
                            </>
                        }/>

                        <Route path="film/:id" element={<DetailsPage loggedUser={loggedUser}/>}/>



                    </Routes>

                </div>
            </BrowserRouter>


            {/*



        <div className='container mt-5'>
            <HideIfLogged loggedUser={loggedUser}>
                <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
            </HideIfLogged>

            <HideIfNotLogged loggedUser={loggedUser}>
                <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
                <BlogForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>
            </HideIfNotLogged>


        </div>
        */}
        </>
    )
}
