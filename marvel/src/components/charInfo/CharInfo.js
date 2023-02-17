import {Component, Fragment} from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
        isImageFound: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        this.fixedComponentOnScroll();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar(); 
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        
        this.setState({
            error: true
        });
    }

    fixedComponentOnScroll = () => {
        const charInfoBlock = document.querySelector('.char__info');

        window.addEventListener('scroll', (event) => {
            if (window.scrollY >= 465) {
                charInfoBlock.style.cssText = `
                    width: 425px;
                    position: absolute;
                    top: ${window.scrollY - 465}px;
                    right: 0;
                `
            } else {
                charInfoBlock.style.top = '0px';
            }
        })
    }

    updateChar = () => {
        const {charId} = this.props;
        
        if (!charId) {
            return
        }

        this.setState({
            loading: true,
        });

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {

        this.setState({
            char, 
            loading: false,
            error: false,
            isImageFound: char.thumbnail.indexOf('image_not_available') > -1 ? false : true
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const {char, loading, error, isImageFound} = this.state;
        const skeleton = (char || loading || error) ? null : <Skeleton/>;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} isImageFound={isImageFound}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char, isImageFound}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imageStyle = (isImageFound ? null : {objectFit: "contain"});

    return(
        <Fragment>
            <div className="char__basics">
                <img style={imageStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {/* {listComics}  */}
                <ComicsList comics={comics}/>
            </ul>
        </Fragment>
    )
}

const ComicsList = ({comics}) => {
    if (comics.length > 0) { 
        const list = comics.map((item, index) => {

            if (index > 9) return; //ограничиваем кол-во вывода комиксов до 10-ти
            return (
                <li key={index} className="char__comics-item">
                    <a className="char__comics-link" href={item.resourceURI}>
                        {item.name}
                    </a>
                </li>
            )
        })

        return list;
    } else {
        return <p>There is no comics with this character :(</p>
    }
}

CharInfo.propTypes = {
    charId: PropTypes.number 
}

export default CharInfo;