import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const randomOffset = Math.floor(Math.random() * (1300 - 250) + 50);

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(randomOffset);
    const [charEnded, setCharEnded] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    const [inProp, setInProp] = useState(false);
    const duration = 300;

    const {loading, error, getAllCharacters} = useMarvelService();

    const defaultStyle = {
      transition: `all ${duration}ms ease-in-out`,
      opacity: 0,
      visibility: 'hidden'
    }
    
    const transitionStyles = {
        entering: { opacity: 1, visibility: 'visible' },
        entered:  { opacity: 1, visibility: 'visible' },
        exiting:  { opacity: 0, visibility: 'hidden' },
        exited:  { opacity: 0, visibility: 'hidden' },
    };

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        setStartAnimation(false);
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setStartAnimation(true);

        setCharList(charList => [...charList, ...newCharList]); //нам важно значение пред. стейта
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9); //нам важно значение пред. стейта
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                className="char__item"
                tabIndex={0}
                ref={el => itemRefs.current[i] = el}
                key={item.id}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )       
        });

        return (
            <>
                {items}
            </>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <Transition timeout={duration} in={startAnimation}>
                {state => (
                    <ul className="char__grid" style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {items}
                    </ul> 
                )}
            </Transition>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;