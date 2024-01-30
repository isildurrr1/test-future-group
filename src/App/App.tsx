import Search from '../Search/Search';
import './App.sass';


const App = () => {
  return (
    <div className='app'>
      <Search/>
      <div className="found-results">Found 446 results</div>
    </div>
  )
}

export default App