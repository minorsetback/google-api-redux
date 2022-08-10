// types 
import { types } from './types';

const initialState = {
    data: [null],
    isFetching: false,
    error: null,
};

export const booksReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.BOOKS_START_FETCHING:
            return {
                ...state,
                isFetching: true,
            };
        case types.BOOKS_STOP_FETCHING:
            return {
                ...state,
                isFetching: false,
            };
        case types.BOOKS_SET_FETCHING_ERROR:
            return {
                ...state,
                error: payload,
                data: null,
            };
        case types.BOOKS_FILL:
            return {
                ...state,
                data: payload,
                error: null,
            };
        default:
            return state
    }
}