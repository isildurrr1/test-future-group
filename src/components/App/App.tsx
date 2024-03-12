import { useEffect, useState } from 'react';
import { IBook, IOption } from '../../types/types';
import CardsContainer from '../CardsContainer/CardsContainer';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';
import Loader from '../Loader/Loader';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allBooks } from '../../store/booksSlice';

const App = () => {
  const dispatch = useDispatch();
  const booksData = useSelector(allBooks);

  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<IBook>();
  const [searchOption, setSearchOption] = useState<IOption>();

  const [startBookIndex, setStartBookIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitSearch = (formValue: IOption) => {

    dispatch({ type: 'books/reset' })

    setSearchOption(formValue);
    setStartBookIndex(0);
    navigate('/books')
  }

  const handleBookClick = (book: IBook) => {
    setSelectedBook(book);
    navigate('/selected-book')
  }

  const handleLoadMoreClick = () => setStartBookIndex(startBookIndex + 30);

  const BASE_URL = 'https://www.googleapis.com/books/v1/';

  useEffect(() => {
    if (searchOption) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetch(`${BASE_URL}volumes?q=${searchOption.searchText}:${searchOption.category}&orderBy=${searchOption.sort}&maxResults=30&startIndex=${startBookIndex}`, {
          headers: {
            'Authorization': `key=${process.env.REACT_APP_API_KEY}`,
          },
        })
          .then(res => res.json())
          .then((data) => {
            let array: IBook[] = [];
            data.items.forEach((item: any) => {
              const newObj: IBook = {
                'category': item.volumeInfo.categories?.join(', '),
                'smallThumbnail': item.volumeInfo.imageLinks?.smallThumbnail,
                'thumbnail': item.volumeInfo.imageLinks?.thumbnail,
                'title': item.volumeInfo.title,
                'author': item.volumeInfo.authors?.join(', '),
                'discription': item.volumeInfo.description,
              };
              array.push(newObj);
            });

            if (startBookIndex === 0) {
              dispatch({ type: 'books/getBooks', payload: { data: array, total: data.totalItems } });
            } else {
              dispatch({ type: 'books/pushBooks', payload: array });
            }

            setLoading(false);
          })
          .catch(error => {
            console.error('Ошибка:', error);
            setLoading(false);
          });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchOption, startBookIndex, dispatch]);

  return (
    <div className='app'>
      <Search onSubmit={onSubmitSearch} />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/books' element={
          <>
            <CardsContainer
              onBookClick={handleBookClick}
            />
            {booksData.length > 0 && <LoadMoreButton onLoadMoreClick={handleLoadMoreClick} load={loading} />}
          </>
        } />
        <Route path='/selected-book' element={selectedBook ? <Book book={selectedBook} /> : <></>} />
      </Routes>
      {loading && <Loader />}
    </div>
  )
}

export default App;
