//React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booksActions } from '../actions';

export const useBooks = (bookName, minIndex, id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (bookName !== "") {
            dispatch(booksActions.fetchAsync(bookName, minIndex, id));
        }
    }, [bookName, dispatch, minIndex, id]);

    const {
        data,
        isFetching,
        error
    } = useSelector((state) => state.books);

    const [notSortedBooks, setNotSortedBooks] = useState(data?.items);
    const [books, setBooks] = useState(data?.items);


    useEffect(() => {
        if (data?.items) {            
            setBooks(data?.items)
            setNotSortedBooks(data?.items)
            if (isFetching === false && books) {
                setBooks([...books, ...data?.items])
                setNotSortedBooks([...books, ...data?.items])
            }
        }
        // eslint-disable-next-line
    }, [data])

    const Sort = (id) => {
        if (id === 1) {
            return notSortedBooks
        }
        if (id === 2) {
            let sortedBooks = [...books];
            sortedBooks.sort((a, b) => { return new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate) })
            return sortedBooks
        }
    }

    return {
        data,
        isFetching,
        error,
        Sort
    }
}