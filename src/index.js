import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App.jsx';
import registerServiceWorker from './registerServiceWorker';

const root=document.getElementById('root')

let render=()=>{
    ReactDOM.render(<App />, root);
}

if(module.hot){
    module.hot.accept('./app/layout/App',()=>{
        setTimeout(render);
    });
}

render();

registerServiceWorker();
