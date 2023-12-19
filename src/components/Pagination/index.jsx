import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import styles from './Pagination.module.scss';

import { setCurrentPage } from '../../slices/filterSlice';

function Pagination({ currentPage }) {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      forcePage={currentPage - 1}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className={styles.root}
    />
  );
}

export default Pagination;
