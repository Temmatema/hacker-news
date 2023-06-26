import React from 'react';
import Story from "../Story/Story";
import './story-list.css';
import {IStories} from "../../types/stories";

interface StoryListProps {
    stories: IStories[];
}

const StoryList = ({stories}: StoryListProps) => {
    return (
        <div className='story-list'>
            {
                stories.map(story => {
                    return story && <Story key={story.id}
                                  id={story.id}
                                  by={story.by}
                                  score={story.score}
                                  time={story.time}
                                  title={story.title} kids={story.kids}
                    />
                })
            }
        </div>
    );
};

export default StoryList;
