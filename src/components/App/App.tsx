import CardsContainer from '../CardsContainer/CardsContainer';
import { useState } from 'react';
import Book from '../Book/Book';
import Search from '../Search/Search';
import './App.sass';

const App = () => {

  const [showBook, setShowBook] = useState<boolean>(false)

  return (
    <div className='app'>
      <Search />
      {showBook ?
        <Book /> :
        <>
          <div className="found-results">Found 447 results</div>
          <CardsContainer />
        </>
      }
    </div>
  )
}

export default App