import CardsContainer from '../CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';
import { IBook, IOption } from '../../types/types';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const App = () => {

  const [totalBooks, setTotalBooks] = useState<number>();
  const [selectedBook, setSelectedBook] = useState<IBook>();
  const [booksData, setBooksData] = useState<IBook[]>([]);
  const [searchOption, setSearchOption] = useState<IOption>(
    // {
    //   searchText: '',
    //   category: '',
    //   sort: '',
    // }
  );

  const handleBookClick = (book: IBook) => setSelectedBook(book);

  const BASE_URL = 'https://www.googleapis.com/books/v1/';

  useEffect(() => {
    if (searchOption) {
      fetch(`${BASE_URL}volumes?q=${searchOption.searchText}&orderBy=${searchOption.sort}&maxResults=30&startIndex=0`, {
        headers: {
          'Authorization': 'key=AIzaSyC9Ujvz5Ff7wxHAm8IPmU0xf634nieW8Qk',
        },
      })
        .then(res => res.json())
        .then((data) => {
          setTotalBooks(data.totalItems);
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
          setBooksData(array);
        });
    }


  }, [searchOption]);

  return (
    <div className='app'>
      <Search onSubmit={setSearchOption} />
      {
        selectedBook ?
          <Book book={selectedBook} />
          :
          <>
            < CardsContainer
              onBookClick={handleBookClick}
              books={booksData}
              totalBooks={totalBooks}
            />
            <LoadMoreButton />
          </>
      }
    </div>
  )
}

export default App