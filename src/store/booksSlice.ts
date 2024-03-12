import { createSlice } from "@reduxjs/toolkit";
import { BooksState, RootState } from "../types/types";

const initialState: BooksState = {
  books: [],
  loading: false,
  startBookIndex: 0,
  totalBooks: 0,
  searchOption: {
    searchText: '',
    category: '',
    sort: ''
  },
  selectedBook: {
    category: '',
    smallThumbnail: '',
    thumbnail: '',
    title: '',
    author: '',
    discription: ''
  }
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
    setBookIndex(state) {
      state.startBookIndex = state.startBookIndex + 30;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSearchOption(state, action) {
      state.books = [];
      state.totalBooks = 0;
      state.startBookIndex = 0;
      state.searchOption = action.payload
    },
    setSelectedBook(state, action) {
      state.selectedBook = action.payload
    }
  }

})

export const storeBooks = (state: RootState) => state.books;

export const {
  getBooks,
  pushBooks,
  setBookIndex,
  setLoading,
  setSearchOption,
  setSelectedBook
} = booksSlice.actions;

export default booksSlice.reducer;