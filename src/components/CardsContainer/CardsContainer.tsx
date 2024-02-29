import { CardsContainerProps } from '../../types/types';
import Card from '../Card/Card';
import './CardsContainer.sass';

const CardsContainer: React.FC<CardsContainerProps> = ({ books }) => {
  // console.log(books)
  return (
    <div className="cards-container">
      {books.map((book) => {
        console.log(book.smallThumbnail)
        return <Card book={book} />
      })}
      {/* <Card book = {books[0]}/> */}
    </div>
  )
}

export default CardsContainer;