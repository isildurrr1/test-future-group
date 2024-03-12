import { useCallback, useEffect, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeBooks } from '../../store/booksSlice';
import { IBook, IOption } from '../../types/types';
import CardsContainer from '../CardsContainer/CardsContainer';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Book from '../Book/Book';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import './App.sass';

const App = () => {
  const BASE_URL = useMemo(() => 'https://www.googleapis.com/books/v1/', []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector(storeBooks);

  const onSubmitSearch = useCallback((formValue: IOption) => {
    dispatch({
      type: 'books/setSearchOption',
      payload: formValue
    });
    navigate('/books');
  }, [dispatch, navigate]);

  const handleBookClick = (book: IBook) => {
    dispatch({
      type: 'books/setSelectedBook',
      payload: book
    });
    navigate('/selected-book')
  }

  const handleLoadMoreClick = () => dispatch({ type: 'books/setBookIndex' })


  useEffect(() => {
    if (store.searchOption.searchText) {
      dispatch({
        type: 'books/setLoading',
        payload: true
      });
      const timer = setTimeout(() => {
        fetch(`${BASE_URL}volumes?q=${store.searchOption.searchText}:${store.searchOption.category}&orderBy=${store.searchOption.sort}&maxResults=30&startIndex=${store.startBookIndex}`, {
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

            if (store.startBookIndex === 0) {
              dispatch({
                type: 'books/getBooks',
                payload: {
                  data: array,
                  total: data.totalItems
                }
              });
            } else {
              dispatch({
                type: 'books/pushBooks',
                payload: array
              });
            }

            dispatch({
              type: 'books/setLoading',
              payload: false
            });
          })
          .catch(error => {
            console.error('Ошибка:', error);
            dispatch({
              type: 'books/setLoading',
              payload: false
            });
          });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [BASE_URL, store.searchOption, store.startBookIndex, dispatch]);

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
            {store.books.length > 0 && <LoadMoreButton onLoadMoreClick={handleLoadMoreClick} load={store.loading} />}
          </>
        } />
        <Route path='/selected-book' element={store.selectedBook.title ? <Book /> : <></>} />
      </Routes>
      {store.loading && <Loader />}
    </div>
  )
}

export default App;
