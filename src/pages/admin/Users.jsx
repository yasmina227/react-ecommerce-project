import { useState, useEffect } from "react";
import { getAllUsers, deleteUser as deleteUserAPI } from "../../services/adminService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();

      const formatted = data.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role === "admin" ? "Seller" : "Customer",
        status: "Active",
        deleted: false,
      }));

      setUsers(formatted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );
  };

  const restrictUser = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: "Restricted" } : user
      )
    );
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUserAPI(id);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, deleted: true } : user
        )
      );
    } catch (err) {
      alert("Error while deleting user");
    }
  };

  const getStatusClass = (user) => {
    if (user.deleted) return "bg-secondary";
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

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        Error: {error}
        <button className="btn btn-sm btn-dark ms-3" onClick={fetchUsers}>
          Retry
        </button>
      </div>
    );
  }

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
                  <span className={`badge ${getStatusClass(user)}`}>
                    {user.deleted ? "Deleted" : user.status}
                  </span>
                </td>

                <td>
                  {!user.deleted && (
                    <>
                      {user.status !== "Active" && (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => approveUser(user.id)}
                        >
                          Approve
                        </button>
                      )}

                      {user.status !== "Restricted" && (
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => restrictUser(user.id)}
                        >
                          Restrict
                        </button>
                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
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