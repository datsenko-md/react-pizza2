import React from 'react';

import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = React.useState('');
  const memo = React.useMemo(() => ({ searchValue, setSearchValue }), [searchValue]);
  return (
    <SearchContext.Provider value={memo}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
