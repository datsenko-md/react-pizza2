import React from 'react';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import closeIcon from '../../assets/img/close.svg';
import SearchContext from '../../context/SearchContext';

function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();
  const clearSeearchField = () => {
    setSearchValue('');
    inputRef.current.focus();
  };
  const clearIcon = (
    <img
      onClick={() => clearSeearchField()}
      className={styles.closeIcon}
      src={closeIcon}
      alt="close icon"
    />
  );
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue.length > 0 && clearIcon}
    </div>
  );
}

export default Search;
