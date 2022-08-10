import { combineReducers } from 'redux';

import { booksReducer as books } from '../bus/books/reducer';

export const rootReducer = combineReducers({
  books
});
