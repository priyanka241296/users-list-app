import React from "react";

const Pagination = ({ totalPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <touch onClick={() => paginate(number)} className="page-link">
              Page {number}
            </touch>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
