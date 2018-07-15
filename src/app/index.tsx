import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Routes from './../app/routes/index';
const css = require('./style/style.scss');

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION__: any;
    }
  }

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {

    render() {
        return (
            <Routes />
        )
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, window.document.getElementById('root'));