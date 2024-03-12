// import { BookProps } from '../../types/types';
import './Book.sass';
import noPhoto from './../../images/no_image.jpg'
import { useSelector } from 'react-redux';
import { storeBooks } from '../../store/booksSlice';

const Book = () => {
  const store = useSelector(storeBooks);
  return (
    <div className='book'>
      <div className="book-cover">
        <img src={store.selectedBook.thumbnail || noPhoto} alt={store.selectedBook?.title} className="book-image" />
      </div>
      <div className="book-discription">
        <div className="book-container">
          <div className="book-categories">{store.selectedBook?.category}</div>
          <div className="book-title">{store.selectedBook?.title}</div>
          <div className="book-author">{store.selectedBook?.author}</div>
          <div className="book-annotation">{store.selectedBook?.discription}</div>
        </div>
      </div>
    </div>
  )
}

export default Book;