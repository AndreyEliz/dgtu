import {fromJS} from 'immutable';
import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCEED,
    LOGOUT
} from 'actions/action-types';

const initialState = fromJS({
    authorized: true,
    userName: ''
});


const authentication = (state=initialState, action: any) => {
    const reducers:any = {
        [AUTHENTICATION_FAILED]: () => state.merge({authorized: false}),
        [AUTHENTICATION_SUCCEED]: () => state.merge({authorized: true, userName: action.data.name}),
        [LOGOUT]: () => state.merge({authorized: false})
    }

    return (reducers[action.type]  && reducers[action.type]()) || state
};

export default authentication;
