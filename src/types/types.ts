export interface IBook {
  'category': string,
  'smallThumbnail': string,
  'thumbnail': string,
  'title': string,
  'author': string,
  'discription': string
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
  onBookClick: Function,
  books: IBook[],
  totalBooks: number | undefined
}

export interface CardProps {
  book: IBook,
  onBookClick: Function
}

export interface BookProps {
  book: IBook
}