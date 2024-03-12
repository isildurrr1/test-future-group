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
      const { data, total } = action.payload;
      state.books = data;
      state.totalBooks = total;
    },
    pushBooks(state, action) {
      state.books.push(...action.payload);
    },
    reset(state) {
      state.books = [];
      state.totalBooks = 0;
      state.startBookIndex = 0;
    },
    setBookIndex(state) {
      state.startBookIndex = state.startBookIndex + 30;
    },
  }

})

export const storeBooks = (state: RootState) => state.books;
// export const allBooks = (state: RootState) => state.books.books;
// export const totalBooks = (state: RootState) => state.books.totalBooks;

export const {
  getBooks,
  pushBooks,
  reset,
  setBookIndex
} = booksSlice.actions;

export default booksSlice.reducer;