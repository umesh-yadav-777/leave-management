import React, { useState, useEffect } from "react";
import API from "../components/api";

function AdminFeatureManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    fullName: "",
    email: "", // User ka email hi username ki tarah kaam karega
    role: "employee",
    password: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await API.get("accounts/manage-users/");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setIsEditMode(true);
      setCurrentUser({
        id: user.id,
        fullName: user.first_name || "",
        email: user.username || "", // backend username -> frontend email
        role: user.role || "employee",
        password: "",
      });
    } else {
      setIsEditMode(false);
      setCurrentUser({
        id: "",
        fullName: "",
        email: "",
        role: "employee",
        password: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: Console check karein ki data kya hai submit ke waqt
    console.log("Submitting User Data:", currentUser);

    try {
      // 1. Payload Mapping (Ise aur strict banate hain)
      const payload = {
        username: String(currentUser.email).trim(), // .trim() se extra space hat jayega
        first_name: currentUser.fullName,
        role: currentUser.role,
        password: currentUser.password, // Sirf add mode mein password bhejna hai
      };

      // Safety Check: Agar username null ya empty hai toh request na bhejein
      if (!payload.username || payload.username === "undefined") {
        alert("Error: Email/Username is missing in the form!");
        return;
      }

      if (isEditMode) {
        // --- UPDATE USER ---
        await API.patch(`accounts/manage-users/${currentUser.id}/`, payload);
        alert("User updated successfully!");
      } else {
        // --- ADD NEW USER (REGISTER) ---
        payload.password = currentUser.password;

        console.log("Final Payload being sent to Register:", payload);

        // Header add karein taaki Django ise sahi se parse kar sake
        await API.post("accounts/register/", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        alert("New user added successfully!");
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Full Error Object:", err);
      console.error("Submit Error Response Data:", err.response?.data);

      let errorMsg = "The action failed.";
      if (err.response?.data) {
        const data = err.response.data;

        // Agar backend error string hai toh direct dikhayein
        if (typeof data === "string") {
          errorMsg = data;
        }
        // Agar backend database error bhej raha hai (jo aapko aaya tha)
        else if (data.error) {
          errorMsg = data.error;
        }
        // Baki validation errors ke liye
        else {
          errorMsg = Object.entries(data)
            .map(([key, val]) => `${key}: ${val}`)
            .join("\n");
        }
      }

      alert("Error Details:\n" + errorMsg);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      try {
        await API.delete(`accounts/manage-users/${id}/`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.patch(`accounts/manage-users/${id}/`, {}); // Backend handles toggle
      fetchData();
    } catch (err) {
      alert("Status update failed!");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fcfcfd",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: "navy", fontWeight: "800" }}>
            User Control Center
          </h2>
          <p className="text-muted">Total Employees: {users.length}</p>
        </div>
        <button
          className="btn btn-primary shadow-sm"
          onClick={() => handleOpenModal()}
          style={{ borderRadius: "10px" }}
        >
          <i className="bi bi-plus-lg me-2"></i>Add New User
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "20px", overflow: "hidden" }}
        >
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3">User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <div className="fw-bold">{user.first_name || "N/A"}</div>
                    <div className="small text-muted">{user.username}</div>
                  </td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`badge border-0 py-2 px-3 ${user.is_active ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
                      style={{ borderRadius: "20px", cursor: "pointer" }}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-info me-2"
                      onClick={() => handleOpenModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: "20px" }}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  {isEditMode ? "Edit Employee" : "Add New Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentUser.fullName}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email (Username)</label>
                    <input
                      type="email"
                      className="form-control"
                      value={currentUser.email}
                      disabled={isEditMode} // Edit mode mein email/username change nahi hota zyadatar
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {!isEditMode && (
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) =>
                          setCurrentUser({
                            ...currentUser,
                            password: e.target.value,
                          })
                        }
                        required={!isEditMode}
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={currentUser.role}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, role: e.target.value })
                      }
                    >
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Update" : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFeatureManageUsers;
