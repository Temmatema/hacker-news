import React, {Dispatch, useContext, useEffect} from 'react';
import StoryList from "../components/StoryList/StoryList";
import {IStories} from "../types/stories";
import {Context, IContext} from "../context/context";
import Loading from "../components/Loading";

interface HomeProps {
    stories: IStories[];
    setStories: Dispatch<IStories[]>
}

const Home = ({stories}: HomeProps) => {
    const {setIsHome} = useContext(Context) as IContext;

    useEffect(() => {
        if (setIsHome) {
            setIsHome(true)
        }
    }, []);

    return (
        <>
            {
                stories.length === 0 ?
                    <Loading/> : <StoryList stories={stories}/>
            }
        </>
    );
};

export default Home;
