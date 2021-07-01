import React, { useState, useEffect } from "react";

import List from "./List";
import Pagination from "./Pagination";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getUsers(pageNumber);
  };

  const getUsers = async (page) => {
    setLoading(true);
    console.log(currentPage);

    var res = await fetch(`https://reqres.in/api/users?page=${page}`);

    var data1 = await res.json();
    const arr = [];

    setUsers(data1.data);
    setCurrentPage(data1.page);
    setPostPerPage(data1.per_page);
    setTotalPage(data1.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = users.slice(0, postsPerPage);

  return (
    <>
      <h2>List of Users</h2>
      <div className="container-fluid mt-5">
        <div className="row text-center">
          <List users={currentPosts} loading={loading} />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Pagination
          
            totalPosts={users.length}
            paginate={paginate}
            totalPage={totalPage}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
