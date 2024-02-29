import CardsContainer from '../CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';
import { IBook } from '../../types/types';

const App = () => {

  const [totalBooks, setTotalBooks] = useState<number>()
  // const [showBook, setShowBook] = useState<boolean>(false)
  const [booksData, setBooksData] = useState<IBook[]>([
    // {
    //   'category': '', // books[0].volumeInfo.categories
    //   'smallThumbnail': '', // books[0].volumeInfo.imageLinks.smallThumbnail
    //   'title': '', // books[0].volumeInfo.title
    //   'author': '', // books[0].volumeInfo.authors.join(', ')
    //   'discription': '' // books[0].volumeInfo.description
    // }
  ]
  )
  // const [books, setBooks] = useState<Array<any>>([])

  const BASE_URL = 'https://www.googleapis.com/books/v1/'
  useEffect(() => {
    fetch(`${BASE_URL}volumes?q=JavaScript&maxResults=30`, {
      headers: {
        'Authorization': 'key=AIzaSyC9Ujvz5Ff7wxHAm8IPmU0xf634nieW8Qk',
      },
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        setTotalBooks(data.totalItems);
        let array: IBook[] = []
        data.items.forEach((item: any) => {
          const newObj: IBook = {
            'category': item.volumeInfo.categories?.join(', '),
            'smallThumbnail': item.volumeInfo.imageLinks?.smallThumbnail,
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
        booksData ?
          <>
            <div className="found-results">{totalBooks ? `Found ${totalBooks} results` : ''}</div>
            <CardsContainer books={booksData} />
          </>
          :
          <></>
      }
    </div>
  )
}

export default App