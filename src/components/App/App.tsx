import CardsContainer from '../CardsContainer/CardsContainer';
import Search from '../Search/Search';
import './App.sass';


const App = () => {
  return (
    <div className='app'>
      <Search />
      <div className="found-results">Found 446 results</div>
      <CardsContainer/>
    </div>
  )
}

export default App