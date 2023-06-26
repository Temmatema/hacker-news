export interface IStories {
    id?: number;
    by: string;
    title: string;
    score: number;
    time: number;
    url?: string;
    kids?: number[];
}

export interface IComments {
    by: string;
    id?: number;
    kids?: number[];
    text: string;
    time?: number,
}
