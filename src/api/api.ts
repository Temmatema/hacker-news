import axios from "axios";
import {IComments, IStories} from "../types/stories";
import {Dispatch} from "react";

let items: IStories[] = [];
let newItems: IStories[] = [];
let ids: number[] = [];
let newIds: number[] = [];

type MethodType = 'getStories' | 'updateStories' | 'getComments' | 'getItemStory';

export const getRequest = async (method: MethodType, setState: Dispatch<any>, idList?: string | number[]) => {
    switch (method) {
        case "getStories": {
            ids = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
                .then(res => res.data.splice(0, 15));

            const requests = ids.map(id =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(response => response.json()));

            await Promise.allSettled(requests).then(results => {
                items = results.map(el => {
                    if (el.status === 'rejected')
                        return null;
                    return el.value;
                });
            });

            setState(items);

            break;
        }
        case "updateStories": {
            newIds = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
                .then(res => res.data.splice(0, 15));

            newIds = newIds.filter(el => !ids.includes(el));

            if (newIds.length)
            {
                ids = [...newIds, ...ids].splice(0, 15);
                await updateRequest(setState);
            }

            break;
        }

        case "getItemStory": {
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${idList}.json?print=pretty`)
                .then(res => {
                    const storyResponse: IStories = res.data;
                    setState(storyResponse);
                });
            break;
        }

        case "getComments": {
            if (typeof idList !== "string"){
                let commentItems: IComments[] = [];

                if (idList) {
                    const requests = idList.map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                            .then(res => res.data));

                    await Promise.allSettled(requests).then(results => {
                        commentItems  = results.map(el => {
                            if (el.status === 'rejected')
                                return null;
                            return el.value;
                        });
                    });

                    setState(commentItems);
                }
            }
            break;
        }

        default:
            return;
    }
}

const updateRequest = async (setStories: Dispatch<IStories[]>) => {
        const requests = newIds.map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(response => response.json()));

        await Promise.allSettled(requests).then(results => {
            newItems = results.map(el => {
                if (el.status === 'rejected')
                    return null;
                return el.value;
            });
        });

        newItems = [...newItems, ...items].splice(0, 15);
        items = newItems;
        setStories(items);
}

