import {fromJS} from 'immutable';
import {
    PROGRAMS_BY_UNIVERSITY,
    SELECT_PROGRAM,
} from 'actions/action-types';

const initialState = fromJS({
    programsByUni: [],
    selectedProgram: ''
});


const programs = (state=initialState, action: any) => {
    const reducers:any = {
        [PROGRAMS_BY_UNIVERSITY]: () => state.merge({programsByUni: fromJS(action.data)}),
        [SELECT_PROGRAM]: () => state.merge({selectedProgram: action.data}),
    }

    return (reducers[action.type]  && reducers[action.type]()) || state
};

export default programs;
