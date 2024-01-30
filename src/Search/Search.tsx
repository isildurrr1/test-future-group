import './Search.sass';

const Search = () => {
  return (
    <div className='search'>
      <form className="search-container">
        <h1 className='search-title'>Search for books</h1>
        <input type="search" className="search-input" />
        <div className="search-selects">
          <div className="search-select">
            <label htmlFor="categories" className='search-label'>Categories</label>
            <select name="categories" id="categories" className="search-categories" >
              <option value={'all'} >all</option>
              <option value={'art'} >art</option>
              <option value={'biography'} >biography</option>
              <option value={'computers'} >computers</option>
              <option value={'history'} >history</option>
              <option value={'medical'} >medical</option>
              <option value={'poetry'} >poetry</option>
            </select>
          </div>
          <div className="search-select">
            <label htmlFor="sorting" className='search-label'>Sorting by</label>
            <select name="sorting" id="sorting" className="search-sorting">
              <option value={'relevance'} >relevance</option>
              <option value={'newest'} >newest</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search