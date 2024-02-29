import CardsContainer from '../CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';
import { IBook } from '../../types/types';

const App = () => {

  const [totalBooks, setTotalBooks] = useState<number>()
  const [selectedBook, setSelectedBook] = useState<IBook>()
  const [booksData, setBooksData] = useState<IBook[]>([])

  const handleBookClick = (book: IBook) => setSelectedBook(book);

  const BASE_URL = 'https://www.googleapis.com/books/v1/'
  useEffect(() => {
    fetch(`${BASE_URL}volumes?q=JavaScript&maxResults=30`, {
      headers: {
        'Authorization': 'key=AIzaSyC9Ujvz5Ff7wxHAm8IPmU0xf634nieW8Qk',
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
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
  }, []);

  return (
    <div className='app'>
      <Search />
      {
        selectedBook ?
          <Book book={selectedBook} />
          :
          < CardsContainer
            onBookClick={handleBookClick}
            books={booksData}
            totalBooks={totalBooks}
          />
      }
    </div>
  )
}

export default App