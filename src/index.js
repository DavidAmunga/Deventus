import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import {configureStore} from './app/store/configureStore';

const store=configureStore();


const root = document.getElementById('root')

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
             <BrowserRouter>
                    < App />
             </BrowserRouter>
        </Provider>
        
         , root);
}

if (module.hot) {
    module.hot.accept('./app/layout/App', () => {
        setTimeout(render);
    });
}

render();

registerServiceWorker();