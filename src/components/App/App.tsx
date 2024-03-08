import { useEffect, useState } from 'react';
import { IBook, IOption } from '../../types/types';
import CardsContainer from '../CardsContainer/CardsContainer';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';
import Loader from '../Loader/Loader';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {

  const navigate = useNavigate();
  const [totalBooks, setTotalBooks] = useState<number>();
  const [selectedBook, setSelectedBook] = useState<IBook>();
  const [booksData, setBooksData] = useState<IBook[]>([]);
  const [searchOption, setSearchOption] = useState<IOption>();
  const [startBookIndex, setStartBookIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitSearch = (formValue: IOption) => {
    setBooksData([]);
    setTotalBooks(0);
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

  // useEffect(() => {
  //   const handleBackButton = () => {
  //     // Здесь вы можете выполнить необходимые действия
  //     // когда пользователь нажимает кнопку "назад" в браузере.
  //     console.log('Нажата кнопка "назад"');
  //   };

  //   window.addEventListener('popstate', handleBackButton);

  //   return () => {
  //     window.removeEventListener('popstate', handleBackButton);
  //   };
  // }, []);

  useEffect(() => {
    if (searchOption) {
      setLoading(true)
      fetch(`${BASE_URL}volumes?q=${searchOption.searchText}:${searchOption.category}&orderBy=${searchOption.sort}&maxResults=30&startIndex=${startBookIndex}`, {
        headers: {
          'Authorization': 'key=AIzaSyC9Ujvz5Ff7wxHAm8IPmU0xf634nieW8Qk',
        },
      })
        .then(res => res.json())
        .then((data) => {
          let array: IBook[] = []
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
          })
          if (!startBookIndex) {
            setTotalBooks(data.totalItems);
            setBooksData(array);
          } else {
            setBooksData(prevBooksData => [...prevBooksData, ...array]);
          }
          setLoading(false)
        })
        .catch(error => console.error('Ошибка:', error));
    }
  }, [searchOption, startBookIndex]);

  return (
    <div className='app'>
      <Search onSubmit={onSubmitSearch} />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/books' element={
          <>
            < CardsContainer
              onBookClick={handleBookClick}
              books={booksData}
              totalBooks={totalBooks}
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