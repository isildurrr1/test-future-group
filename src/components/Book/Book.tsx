import { BookProps } from '../../types/types';
import './Book.sass';
import noPhoto from './../../images/no_image.jpg'

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <div className='book'>
      <div className="book-cover">
        <img src={book.thumbnail || noPhoto} alt={book?.title} className="book-image" />
      </div>
      <div className="book-discription">
        <div className="book-container">
          <div className="book-categories">{book?.category}</div>
          <div className="book-title">{book?.title}</div>
          <div className="book-author">{book?.author}</div>
          <div className="book-annotation">{book?.discription}</div>
        </div>
      </div>
    </div>
  )
}

export default Book;