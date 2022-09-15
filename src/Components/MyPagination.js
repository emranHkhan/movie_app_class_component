import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function MyPagination({ total, current, onPageChange }) {
  let items = [];

  if (current > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onPageChange(current - 1)} />
    );
  }

  for (let page = 1; page <= total - 400; page++) {
    <Pagination.Item
      key={page}
      data-page={page}
      active={page === current}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Pagination.Item>;
  }

  if (current < total) {
    items.push(
      <Pagination.Next key="next" onClick={() => onPageChange(current + 1)} />
    );
  }

  return <Pagination>{items}</Pagination>;
}
