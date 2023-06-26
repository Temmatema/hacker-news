import React, {useEffect, useState} from 'react';
import {getRequest} from "../../api/api";
import {IComments} from "../../types/stories";
import Loading from "../Loading";
import Comment from "./Comment";

interface CommentListProps {
    commentsIds: number[];
}

const CommentList = ({commentsIds}: CommentListProps) => {
    const [comments, setComments] = useState<IComments[]>([]);

    useEffect(() => {
        getRequest("getComments", setComments, commentsIds)
            .catch(er => console.log(er));
    }, [])

    return (
        <div>
            <p>Comments: {commentsIds.length}</p>
            {
                comments ? comments.map(el => <Comment key={el.id} by={el.by} text={el.text}/>) : <Loading/>
            }
        </div>
    );
};

export default CommentList;
