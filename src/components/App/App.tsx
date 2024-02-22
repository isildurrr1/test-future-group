import CardsContainer from '../CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';
import { IBook } from '../../types/types';

const App = () => {

  const [totalBooks, setTotalBooks] = useState<number | null>(null)
  const [showBook, setShowBook] = useState<boolean>(false)
  const [booksData, setBooksData] = useState<IBook>(
    {
      'category': 'Computers', // books[0].volumeInfo.categories
      'cover': 'https://clck.ru/38o4PH', // books[0].volumeInfo.imageLinks.smallThumbnail
      'title': 'Node.js Разработка серверных веб- приложений на JavaScript', // books[0].volumeInfo.title
      'author': 'Дэвид Хэррон', // books[0].volumeInfo.authors.join(', ')
      'discription': 'описание книги' // books[0].volumeInfo.description
    }
  )
  const [books, setBooks] = useState<Array<any>>([])

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=JavaScript&maxResults=30', {
      headers: {
        'Authorization': 'key=AIzaSyC9Ujvz5Ff7wxHAm8IPmU0xf634nieW8Qk',
      }
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data.items);
        console.log(data.totalItems)
        setTotalBooks(data.totalItems)
        setBooks(data.items)
      });
  }, []);

  return (
    <div className='app'>
      <Search />
      {showBook ?
        <Book /> :
        <>
          <div className="found-results">{totalBooks ? `Found ${totalBooks} results` : ''}</div>
          {books[0] !== undefined && console.log(books)}
          {/* <div className="found-results">{console.log(books)}</div> */}
          <CardsContainer />
        </>
      }
    </div>
  )
}

export default App