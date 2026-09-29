import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@gmail.com",
      role: "Customer",
      status: "Pending",
      deleted: false,
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@gmail.com",
      role: "Seller",
      status: "Active",
      deleted: false,
    },
    {
      id: 3,
      name: "Omar Hassan",
      email: "omar@gmail.com",
      role: "Customer",
      status: "Active",
      deleted: false,
    },
  ]);

  const approveUser = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: "Active" }
          : user
      )
    );
  };

  const restrictUser = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: "Restricted" }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, deleted: true }
          : user
      )
    );
  };

  const getStatusClass = (user) => {
    if (user.deleted) {
      return "bg-secondary";
    }

    switch (user.status) {
      case "Active":
        return "bg-success";

      case "Restricted":
        return "bg-danger";

      case "Pending":
        return "bg-warning text-dark";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage customers and sellers.</p>
        </div>
      </div>

      <div className="dashboard-box mt-4">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`badge ${getStatusClass(user)}`}
                  >
                    {user.deleted
                      ? "Deleted"
                      : user.status}
                  </span>
                </td>

                <td>
                  {!user.deleted && (
                    <>
                      {user.status !== "Active" && (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            approveUser(user.id)
                          }
                        >
                          Approve
                        </button>
                      )}

                      {user.status !== "Restricted" && (
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            restrictUser(user.id)
                          }
                        >
                          Restrict
                        </button>
                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;