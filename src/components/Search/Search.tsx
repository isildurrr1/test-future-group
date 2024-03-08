import { useCallback, useState } from 'react';
import './Search.sass';
import { IOption, SearchProps } from '../../types/types';

const Search: React.FC<SearchProps> = ({ onSubmit }) => {

  const [formValue, setFormValue] = useState<IOption>({
    searchText: '',
    category: 'all',
    sort: 'relevance',
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValue);
  }, [formValue, onSubmit]);
  

  return (
    <div className='search'>
      <form className="search-container" onSubmit={handleSubmit}>
        <h1 className='search-title'>Search for books</h1>
        <div className="search-inputContainer">
          <input
            type="text"
            className="search-input"
            name='searchText'
            onChange={handleChange}
          />
          <button 
          type='submit' 
          className="search-submitBtn"
          disabled={!formValue.searchText}
          />
        </div>
        <div className="search-selects">
          <div className="search-select">
            <label htmlFor="categories" className='search-label'>Categories</label>
            <select
              name="category"
              id="categories"
              className="search-categories"
              onChange={handleChange}
            >
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
            <select
              name="sort"
              id="sorting"
              className="search-sorting"
              onChange={handleChange}
            >
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