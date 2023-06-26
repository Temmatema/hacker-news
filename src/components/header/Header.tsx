import React, {Dispatch, useContext} from 'react';
import './header.css'
import {throttle} from "lodash";
import {IStories} from "../../types/stories";
import {Link} from "react-router-dom";
import {Context, IContext} from "../../context/context";
import {getRequest} from "../../api/api";

interface headerProps {
    setStories: Dispatch<IStories[]>;
}

const Header = ({setStories}: headerProps) => {
    const {isHome} = useContext(Context) as IContext;

    const updateStories =
            throttle(() => getRequest("updateStories", setStories), 5000);

    return (
        <div className='header bg-dark'>
            <h1 className='header__title'>Hacker News</h1>
            <div className='header__wrap'>
                {
                    isHome ?
                     null : <Link to='/' className='header__btn btn btn-primary'>Home</Link>
                }
                {
                    isHome ?
                        <button onClick={updateStories} className='header__btn btn btn-info'>Update</button>
                        : null
                }
            </div>
        </div>
    );
};

export default Header;
