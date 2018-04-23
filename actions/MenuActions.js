import {
    OPEN_MENU,
    CLOSE_MENU,
    TOGGLE_MENU,
    SET_OPTIONS
} from './types';

export const openMenu = () => {
    return {
        type: OPEN_MENU
    };
}

export const closeMenu = () => {
    return {
        type: CLOSE_MENU
    };
}
