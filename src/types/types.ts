export interface IBook {
  'category': string,
  'smallThumbnail': string,
  'thumbnail': string,
  'title': string,
  'author': string,
  'discription': string
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