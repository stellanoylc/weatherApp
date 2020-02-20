import * as Actions from './actions';

const initialState = {
    data: null      
};

const weathers = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_WEATHER:
            {
                console.log("run here reducer =",action.payload )
                return {
                    ...state,
                    data: action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default weathers;