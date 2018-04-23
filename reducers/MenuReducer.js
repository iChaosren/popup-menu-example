import {
    CLOSE_MENU,
    OPEN_MENU,
    TOGGLE_MENU,
    SET_OPTIONS
} from "../actions/types";

const INITIAL_STATE = {
    open: false,
    options: () => {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_OPTIONS:
            return { ...state, options: action.payload };
        case OPEN_MENU:
            return { ...state, open: true };
        case CLOSE_MENU:
            return { ...state, open: false };
        case TOGGLE_MENU:
            return { ...state, open: !state.open };
        default:
            return state;
    }
};
