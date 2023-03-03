import './comicsList.scss';
import { Transition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(24);
    const [newLoadingComics, setNewLoadingComics] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden'
    }

    const transitionStyles = {
        entering: { opacity: 1, visibility: 'visible' },
        entered:  { opacity: 1, visibility: 'visible' },
        exiting:  { opacity: 0, visibility: 'hidden' },
        exited:  { opacity: 0, visibility: 'hidden' },
    };

    const getComics = (offset, initial) => {
        initial ? setNewLoadingComics(false) : setNewLoadingComics(true); 

        getAllComics(offset).then(onComicsLoaded);
    }

    useEffect(() => {
        getComics(24, true);
    }, []);

    const onComicsLoaded = (newData) => {
        setNewLoadingComics(false);
        setComics(() => [...comics, ...newData]);
        setOffset(offset => offset + 8);
    }   

    const renderComics = (comicsData) => {
        const comics = comicsData.map((comic, i) => {
            return (
                <li key={i} className="comics__item">
                    <Link to={`${comic.id}`}>
                        <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        });
       return comics;
    }

    const items = renderComics(comics);
    const spinner = loading && !newLoadingComics ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <Transition in={!loading} timeout={duration}>
                {state => (
                    <ul className="comics__grid" style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                        }}>
                        {items}
                    </ul>
                )}
            </Transition>
            
            <button 
                className="button button__main button__long"
                onClick={() => getComics(offset)}
                disabled={newLoadingComics}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;