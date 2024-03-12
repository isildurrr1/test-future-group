import { createSlice } from "@reduxjs/toolkit";
import { BooksState, RootState } from "../types/types";

const initialState: BooksState = {
  books: [],
  loading: false,
  startBookIndex: 0,
  totalBooks: 0,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks(state, action) {
      const {data, total} = action.payload;
      state.books = data;
      state.totalBooks = total;
    },
    pushBooks(state, action) {
      state.books.push(...action.payload);
    },
    reset(state) {
      state.books = [];
      state.totalBooks = 0;
    }
  }

})

export const allBooks = (state: RootState) => state.books.books;
export const totalBooks = (state: RootState) => state.books.totalBooks;

export const { getBooks, pushBooks, reset } = booksSlice.actions; 

export default booksSlice.reducer;