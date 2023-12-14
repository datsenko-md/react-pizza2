import React from 'react';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import closeIcon from '../../assets/img/close.svg';

function Search({ searchValue, setSearchValue }) {
  const clearIcon = (
    <img
      onClick={() => setSearchValue('')}
      className={styles.closeIcon}
      src={closeIcon}
      alt="close icon"
    />
  );
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input
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
