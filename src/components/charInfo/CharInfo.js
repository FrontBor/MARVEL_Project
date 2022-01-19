import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessege/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }


    // когда вызывается этот хук получает как аргументы, как предыдущие пропсы так и предыдущие состояния
    componentDidUpdate(prevProps) {     
        if(this.props.charId !== prevProps.charId) {   //недопущение босконечной петли (цыкла)
            this.updateChar();                  
        }
    }

    

    updateChar = () => {
        const {charId} = this.props;
            if(!charId) {
                return;
            }

            this.onCharLoading();
            this.marvelService
                .getCharacter(charId)
                .then(this.onCharLoaded)
                .catch(this.onError);
    }

    onCharLoaded = (char) => {   // конечный результат загрузки
        this.setState({
            char,
            loading: false
        });
           
    }

    onCharLoading = () => {    // промежуточный результат прогрузки
        this.setState({
            loading: true
        })
    }

    onError = () => {          // при выпадении ошибок
        this.setState({
            loading: false,
            error: true
        });
    }

    render () {

        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

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

const View = ({char}) => {


    const {name, description, thumbnail, homepage, wiki, comics} = char;

    //оптимизация картинки по размеру окошка
    let imgStyle = {'objectFit' : 'cover'};   
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {   // если изображение приходит не в формате окошка
            imgStyle = {'objectFit' : 'contain'};      // адаптирует его под окошко
    }
    return(
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
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
                    {comics.length > 0 ? null : 'Этот персонаж не был замечен в коммиксах, возможно стоит поискать в других книжках...? о_0'}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i > 10) return;     // eslint игнорирует предупреждения
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                    }
                    
                    
                    
                    
                </ul>
        </>
    )
}

export default CharInfo;