import {createContext, Dispatch} from "react";

export interface IContext {
    isHome?: boolean;
    setIsHome?: Dispatch<boolean>;
}

export const Context = createContext<IContext | null>(null);
