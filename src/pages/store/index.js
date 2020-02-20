// import * as reducers from "./reducers.js";

// export default {
//     weather: reducers.weatherReducer,
// }

import {combineReducers} from 'redux';
import weathers from './reducers';

const reducer = combineReducers({
    weathers 
});

export default reducer;