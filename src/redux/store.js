import RootReducer from "./reducer/rootReducer";
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const store = configureStore({ reducer: RootReducer,
    
})

export default store;