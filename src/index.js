import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './App';
import * as serviceWorker from './serviceWorker'

import homeReducer from './store/reducers/homeReducer'
import langReducer from './store/reducers/langReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    language: langReducer,
    home: homeReducer
})

const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk )))

const app = (
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render( app , document.getElementById('root'));

serviceWorker.unregister();