import React from 'react';
import {IComments} from "../../types/stories";
import HTMLReactParser from "html-react-parser";

const Comment = ({by, text}: IComments) => {

    return (
        <div className="card text-bg-light mb-3">
            <div className="card-header">{by}</div>
            <div className="card-body">
                <p className="card-text">{HTMLReactParser(text)}</p>
            </div>
        </div>
    );
};

export default Comment;
