export interface IBook {
  category: string,
  smallThumbnail: string,
  thumbnail: string,
  title: string,
  author: string,
  discription: string
}

export interface IOption {
  searchText: string,
  category: string,
  sort: string
}

export interface SearchProps {
  onSubmit: Function
}

export interface CardsContainerProps {
  onBookClick: Function
}

export interface CardProps {
  book: IBook,
  onBookClick: Function
}

// export interface BookProps {
//   book: IBook
// }

export interface LoadMoreButtonProps {
  onLoadMoreClick: Function,
  load: boolean
}

export interface BooksState {
  books: IBook[],
  loading: boolean,
  startBookIndex: number,
  totalBooks: number,
  searchOption: IOption,
  selectedBook: IBook
}

export interface RootState {
  books: BooksState;
}