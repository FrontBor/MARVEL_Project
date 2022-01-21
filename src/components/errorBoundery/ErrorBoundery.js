import { Component } from "react";
import ErrorMessage from "../errorMessege/ErrorMessage";

class ErrorBoundery extends Component {     // Предохранитель от ошибок

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {     // хук для ловли ошибок
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return this.props.children
    }
}

export default ErrorBoundery;