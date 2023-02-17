import { Component } from "react";
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    static getDerivedStateFromError(error) { //он только обновляет стейт, ничего больше
        return {error: true};
    }

    componentDidCatch(error, errorInfo) { //можно использовать его, если нужно не только обновить стейт с ошибкой, а ещё дополнительно что-то сделать.
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        } 

        return this.props.children;
    }
}

export default ErrorBoundary;