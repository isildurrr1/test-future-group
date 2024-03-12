import { useSelector } from 'react-redux';
import {  storeBooks } from '../../store/booksSlice';
import { CardsContainerProps } from '../../types/types';
import Card from '../Card/Card';
import './CardsContainer.sass';

const CardsContainer: React.FC<CardsContainerProps> = ({ onBookClick }) => {
  const store = useSelector(storeBooks);
  return (
    <>
      <div className="found-results">{store.totalBooks ? `Found ${store.totalBooks} results` : ''}</div>
      <div className="cards-container">
        {store.books.map((item, index) =>
          <Card book={item} key={index} onBookClick={onBookClick} />
        )}
      </div>
    </>
  )
}

export default CardsContainer;