import {combineReducers} from 'redux';
import authentication from './authentication.reducer';
import programs from './programs.reducer';

const rootReducer = combineReducers({
    authentication,
    programs,
});

export default rootReducer;
