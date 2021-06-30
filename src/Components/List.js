import React from "react";

const List = ({ users, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      {users.map((user) => {
        return (
          <div className="col-10 col-md-4 mt-5" key={user.id}>
            <div className="card p-2">
              <div className="d-flex align-items-center">
                <div className="image">
                  <img src={user.avatar} className="rounded" width="155"></img>
                </div>
                <div className="ml-2 w-100">
                  <h4 className="mb-0 mt-2 textLeft">
                    {user.first_name} &nbsp;
                    {user.last_name}
                  </h4>
                  <p>Email:{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
