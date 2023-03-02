import {useHttp} from '../hooks/http.hook'; 

const  useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=10cf9637ef889e947d8d6ccaed1b4f1b';
    const _defaultCharOffset = 210;
    const _comicsOffset = 0;

    const getAllCharacters = async (offset = _defaultCharOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}?&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?&${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(`${_apiBase}/comics?issueNumber=2&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            description: comics.description ? comics.description : 'There is no description for this comics',
            price: comics.prices[0].price ? comics.prices[0].price + '$' : 'Not available',
            details: comics.urls[0].url,
            pages: comics.pageCount,
            language: comics.textObjects.language || 'en-us'
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, clearError}
}

export default useMarvelService;