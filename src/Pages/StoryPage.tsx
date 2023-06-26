import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {Context, IContext} from "../context/context";
import axios from "axios";
import {IStories} from "../types/stories";
import StoryPageItem from "../components/storyItem/StoryPageItem";
import {getRequest} from "../api/api";
import Loading from "../components/Loading";


const StoryPage = () => {
    const [story, setStory] = useState<IStories | null>(null)
    const {id} = useParams();
    const {setIsHome} = useContext(Context) as IContext;
    const {state} = useLocation();

    useEffect(() => {
        getRequest("getItemStory", setStory, id).catch(er => console.log(er));

        if (setIsHome) {
            setIsHome(false)
        }
    }, []);

    return (
        <>
            {
                story ?
                    <StoryPageItem story={story} state={state}/>
                    :
                    <Loading/>
            }
        </>
    );
};

export default StoryPage;
