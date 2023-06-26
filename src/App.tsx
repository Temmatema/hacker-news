import React, {useEffect, useState} from 'react';
import Header from "./components/header/Header";
import {IStories} from "./types/stories";
import {getRequest} from "./api/api";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import StoryPage from "./Pages/StoryPage";
import {Context} from "./context/context";

function App() {
    const [stories, setStories] = useState<IStories[]>([]);
    const [isHome, setIsHome] = useState<boolean>(true);


    useEffect(() => {
        getRequest("getStories", setStories).catch(er => console.log(er));

        const interval = setInterval(() => {
            getRequest("updateStories", setStories).catch(er => console.log(er));
        }, 60000);

        return () => {
            clearInterval(interval);
        }
    }, []);


    return (
        <Context.Provider value={
            {isHome, setIsHome}
        }>
            <BrowserRouter>
                <Header setStories={setStories}/>
                <Routes>
                    <Route path="/" element={<Home stories={stories} setStories={setStories}/>}/>
                    <Route path="/page/:id" element={<StoryPage/>}/>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
