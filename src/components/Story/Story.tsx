import React from 'react';
import {IStories} from "../../types/stories";
import {Link} from "react-router-dom";

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Story = ({id, by, time, score, title, kids}: IStories) => {
    let date = new Date(time * 1000);

    function dateHandler():string {
        const day = `${date.getDate()} ${monthNames[date.getMonth() + 1]}`;
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
        return `${day} ${hour}:${minutes}:${seconds}`;
    }

    return (
        <div className='story card'>
                <div className="card-header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    {by}
                    {
                        kids ? <span style={{color: '#0d6efd'}}>Comments: {kids.length}</span> : null
                    }
                </div>
                <div className="card-body" style={
                    {display: 'flex' ,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'}
                }>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{dateHandler()}</p>
                    <span style={{
                        position: 'absolute',
                        right: '20px', bottom: '20px'
                    }}>Rating: {score}</span>
                    <Link to={{pathname:`/page/${id}`}}
                          state={{date: dateHandler()}}
                          className="btn btn-primary">View page</Link>
                </div>
        </div>
    );
};

export default Story;
