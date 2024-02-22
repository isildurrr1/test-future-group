import { CardsContainerProps } from '../../types/types';
import Card from '../Card/Card';
import './CardsContainer.sass';

const CardsContainer: React.FC<CardsContainerProps> = ({books}) => {
  console.log(books)
  return (
    <div className="cards-container">
      <Card />
    </div>
  )
}

export default CardsContainer;