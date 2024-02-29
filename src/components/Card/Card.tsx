import { CardProps } from '../../types/types';
import './Card.sass';
import noPhoto from './../../images/no_image.jpg'

const Card: React.FC<CardProps> = ({ book, onBookClick }) => {
  const handleClick = () => onBookClick(book)
  return (
    <div className="card" onClick={handleClick}>
      <img src={book?.smallThumbnail || noPhoto} alt={book?.title} className="card-cover" />
      <div className="card-info">
        <div className="card-categories">{book?.category}</div>
        <div className="card-title">{book?.title}</div>
        <div className="card-author">{book?.author}</div>
      </div>
    </div>
  )
}

export default Card;