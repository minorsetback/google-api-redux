//React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksActions } from '../actions';

export const useBooksFetch = (bookName, minIndex, id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (bookName !== "") {
            dispatch(booksActions.fetchAsync(bookName, minIndex, id));
        }
    }, [bookName, dispatch, minIndex]);

    const {
        data,
        isFetching,
        error
    } = useSelector((state) => state.books);

    return {
        data,
        isFetching,
        error,
    }
}