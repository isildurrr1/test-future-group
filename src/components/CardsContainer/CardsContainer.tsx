import { CardsContainerProps } from '../../types/types';
import Card from '../Card/Card';
import './CardsContainer.sass';

const CardsContainer: React.FC<CardsContainerProps> = ({ books, totalBooks, onBookClick }) => {
  return (
    <>
      <div className="found-results">{totalBooks ? `Found ${totalBooks} results` : ''}</div>
      <div className="cards-container">
        {books.map((item, index) =>
          <Card book={item} key={index} onBookClick={onBookClick} />
        )}
      </div>
    </>
  )
}

export default CardsContainer;