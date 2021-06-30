import React, { useState, useEffect } from "react";

import List from "./List";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(6);

  const [pageLimit, setPageLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const getUsers = async () => {
    setLoading(true);
    const res = await fetch(`https://reqres.in/api/users?page=${currentPage}`);

    const data1 = await res.json();
    // console.log(data1.page);
    setUsers(data1.data);

    setLoading(false);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
    pages.push(i);
  }
  const renderPageNumber = pages.map((number) => {
    if (number < maxPageLimit + 1 && number > minPageLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  useEffect(() => {
    getUsers();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageLimit);
      setMinPageLimit(minPageLimit + pageLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageLimit);
      setMinPageLimit(minPageLimit - pageLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxPageLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>;
  }
  let pageDecrementBtn = null;
  if (pages.length > maxPageLimit) {
    pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
  }
  return (
    <>
      <h2>List of Users</h2>
      <div className="container-fluid mt-5">
        <div className="row text-center">
          <List users={currentPosts} loading={loading} />
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <ul className="pageNumbers">
            <li>
              <button
                onClick={handlePrevBtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                {pageDecrementBtn}
                Prev
              </button>
            </li>
            {renderPageNumber}
            <li>
              <button
                onClick={handleNextBtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                {pageIncrementBtn}
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserList;
