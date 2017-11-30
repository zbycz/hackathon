import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store/index';
import Panel from './components/Panel'


ReactDOM.render(
    <Provider store={store}>
        <Panel className={"panel"} />
        <div id="map" />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();



