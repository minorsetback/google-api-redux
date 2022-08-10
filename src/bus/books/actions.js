//Types
import { types } from './types';
import { api } from '../../api';

export const booksActions = Object.freeze({
    //Sync
    startFetching: () => {
        return {
            type: types.BOOKS_START_FETCHING
        }
    },
    stopFetching: () => {
        return {
            type: types.BOOKS_STOP_FETCHING
        }
    },
    fill: (payload) => {
        return {
            type: types.BOOKS_FILL,
            payload
        }
    },
    setFetchingError: (error) => {
        return {
            type: types.BOOKS_SET_FETCHING_ERROR,
            error: true,
            payload: error
        }
    },
    fetchAsync: (bookName, minIndex, id) => async (dispatch) => {
        dispatch(booksActions.startFetching());
        
        let response;
        if (id) {
            response = await api.books.fetchById(id);
        } else {
            response = await api.books.fetch(bookName, minIndex);
        }
        if (response.status === 200) {
            dispatch(booksActions.fill(response.data));
        } else {
            const error = {
                status: response.status
            };
            dispatch(booksActions.setFetchingError(error));
        }
        dispatch(booksActions.stopFetching());
    }
})