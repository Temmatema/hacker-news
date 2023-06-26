import React from 'react';
import {IStories} from "../../types/stories";
import './storyItem.css';
import CommentList from "../Comments/CommentList";
interface ItemProps {
    story: IStories;
    state: any;
}

const StoryPageItem = ({story, state}: ItemProps) => {

    return (
        <div className='story-page'>
            <div className="story-page__wrap bg-dark">
                <h2 className='story-page__title'>{story.title}</h2>
                <p>
                    <a href={story.url}
                       className="story-page__link link-info link-offset-2 link-underline-opacity-25
              link-under line-opacity-100-hover">
                        {story.url}
                    </a>
                </p>
                <div className='story-page__date-wrap'>
                    <p className="story-page__date">
                        { state.date }
                    </p>
                    <span>by {story.by}</span>
                </div>
                <div className="comments" style={{gridColumn: '1/3'}}>
                    {
                        story.kids ? <CommentList commentsIds={story.kids}/> : 'Comments: 0'
                    }
                </div>
            </div>
        </div>
    );
};

export default StoryPageItem;
