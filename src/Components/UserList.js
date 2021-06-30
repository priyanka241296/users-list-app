import React, { useState, useEffect } from "react";

import List from "./List";
import Pagination from "./Pagination";
const UserList = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(1);

  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  const getUsers = async () => {
    setLoading(true);
    console.log(currentPage);
    const res = await fetch(`https://reqres.in/api/users?page=${currentPage}`);

    const data1 = await res.json();
    setUsers(data1.data);
    setCurrentPage(data1.page);
    setPostPerPage(data1.per_page);

    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <h2>List of Users</h2>
      <div className="container-fluid mt-5">
        <div className="row text-center">
          <List users={currentPosts} loading={loading} />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            postPerPage={postsPerPage}
            totalPosts={users.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
