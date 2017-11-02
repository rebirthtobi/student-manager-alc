import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

class Index extends Component {
    render() {
        return (
            <App />
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
