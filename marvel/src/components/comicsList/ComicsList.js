import './comicsList.scss';
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
            <ul className="comics__grid">
                {items}
            </ul>
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