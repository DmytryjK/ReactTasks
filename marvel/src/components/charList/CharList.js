import {Component} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner'
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            charList: [],
            isImageFound: true,
            loading: true,
            paginationLoading: false,
            offsetLoading: Math.floor(Math.random() * (1500 - 100) + 100),
            charEnded: false
        }
    }

    componentDidMount() {
        this.updateCharList();
    }

    updateCharList = () => {
        this.paginationLoadChar();

        this.marvelService
            .getAllCharacters(this.state.offsetLoading)
            .then(this.charLoaded)
            .catch(this.onError);
    }

    paginationLoadChar = () => {
        this.setState({
            paginationLoading: true
        })
    }

    marvelService = new MarvelService();

    charLoaded = (newCharList) => {
        let ended = false;

        if (newCharList.length < 1) {
            ended = true;
        }

        this.setState(({offsetLoading, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            paginationLoading: false,
            offsetLoading: offsetLoading + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        console.log('something went wrong');
    }

    render() {
        const {charList, loading, paginationLoading, charEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {spinner}
                <ul className="char__grid">
                    {charList ? <CharItems state={this.state} props={this.props}/> : null}
                </ul>
                <button
                    disabled={paginationLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={this.updateCharList}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharItems = ({state, props}) => {
    const {charList} = state;

    const htmlItems = charList.map(char => {
        const {name, thumbnail, id} = char;
        const imageIsLoaded = (thumbnail.indexOf('image_not_available') > -1) ? ({objectFit: "fill"}) : null;

        return (
            <li key={id} 
                className="char__item"
                onClick={() => props.onCharSelected(char.id)}>
                    <img style={imageIsLoaded} src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
            </li>
        )
    });

    return (htmlItems);
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;