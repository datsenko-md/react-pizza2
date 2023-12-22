import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import closeIcon from '../../assets/img/close.svg';
import { setSearchValue } from '../../slices/filterSlice';

function Search() {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.filter);
  const [value, setValue] = React.useState(searchValue);

  const inputRef = React.useRef();
  const clearSeearchField = () => {
    setValue('');
    dispatch(setSearchValue(''));
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
    _.debounce((search) => dispatch(setSearchValue(search)), 1000),
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
