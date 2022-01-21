import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from "../errorBoundery/ErrorBoundery";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {    // из этого компонента приходит и устанавливается в стейт,
        this.setState({           // и передаётся в компонент CharInfo 
            selectedChar: id
        })

    }

   render () {
    return (
        <div className="app">
            <ErrorBoundery>
                <AppHeader/>
            </ErrorBoundery>
            <main>
                <ErrorBoundery>
                    <RandomChar/>
                </ErrorBoundery>
                <div className="char__content">
                    <ErrorBoundery>
                        <CharList onCharSelected={this.onCharSelected}/>   
                    </ErrorBoundery>
                    <ErrorBoundery>
                        <CharInfo charId={this.state.selectedChar}/>    
                    </ErrorBoundery>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
   }
}

export default App;