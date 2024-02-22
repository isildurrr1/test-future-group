export interface IBook {
  'category': string,
  'smallThumbnail': string,
  'title': string,
  'author': string,
  'discription': string
}

export interface CardsContainerProps {
  books: IBook[]
}