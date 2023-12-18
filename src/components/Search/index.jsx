import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import closeIcon from '../../assets/img/close.svg';
import SearchContext from '../../context/SearchContext';

function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();
  const clearSeearchField = () => {
    setValue('');
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

  const updateSearchValue = React.useCallback(
    debounce((search) => setSearchValue(search), 1000),
    [],
  );

  const handleChangeInput = (search) => {
    setValue(search);
    updateSearchValue(search);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск"
        value={value}
        onChange={(e) => handleChangeInput(e.target.value)}
      />
      {value.length > 0 && clearIcon}
    </div>
  );
}

export default Search;
