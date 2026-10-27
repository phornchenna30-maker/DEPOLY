
import { useState } from "react";
import "./index.css";

export default function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "bobo",
      gender: "M",
      address: "pp",
      phone: "0123456789",
    },
    {
      id: 2,
      username: "dara",
      gender: "M",
      address: "pp",
      phone: "0123456789",
    },
  ]);

  const [form, setForm] = useState({
    username: "",
    gender: "",
    address: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.gender ||
        !form.address.trim() || !form.phone.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    if (editId !== null) {
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...form, id: editId } : user
        )
      );
      setEditId(null);
    } else {
      setUsers([
        ...users,
        { ...form, id: Date.now() },
      ]);
    }

    handleClear();
  };

  const handleClear = () => {
    setForm({
      username: "",
      gender: "",
      address: "",
      phone: "",
    });
    setEditId(null);
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      gender: user.gender,
      address: user.address,
      phone: user.phone,
    });
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));

      if (editId === id) {
        handleClear();
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Create User</div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">M</option>
                <option value="Female">F</option>
               
              </select>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone "
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-add">
              {editId !== null ? "Update User" : "Add User"}
            </button>

            <button
              type="button"
              className="btn-clear"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="card user-card">
        <div className="card-header">
          User List ({users.length})
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
