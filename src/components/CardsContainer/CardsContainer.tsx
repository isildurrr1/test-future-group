import { useSelector } from 'react-redux';
import { allBooks, totalBooks } from '../../store/booksSlice';
import { CardsContainerProps } from '../../types/types';
import Card from '../Card/Card';
import './CardsContainer.sass';

const CardsContainer: React.FC<CardsContainerProps> = ({ onBookClick }) => {
  const books = useSelector(allBooks);
  const total = useSelector(totalBooks);
  return (
    <>
      <div className="found-results">{total ? `Found ${total} results` : ''}</div>
      <div className="cards-container">
        {books.map((item, index) =>
          <Card book={item} key={index} onBookClick={onBookClick} />
        )}
      </div>
    </>
  )
}

export default CardsContainer;