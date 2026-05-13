import API from "../components/api";
import React, { useState, useEffect } from "react";

function AdminProfile() {
  const [userData, setUserData] = useState({
    first_name: "",
    username: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("accounts/profile/");
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!newPassword) {
      alert("Please enter a new password first!");
      return;
    }

    try {
      await API.post("accounts/change-password/", {
        new_password: newPassword,
      });

      alert("Password updated successfully!");
      setNewPassword("");
    } catch (err) {
      console.error("Update error:", err);
      alert(
        "Failed to update password. Make sure the backend is live on Render.",
      );
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Profile...</span>
        </div>
      </div>
    );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fcfcfd",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{ color: "navy", fontWeight: "800" }}
        className="mb-4 text-start"
      >
        My Account Settings
      </h2>

      <div
        className="card border-0 shadow-sm p-4 mx-auto mx-md-0"
        style={{ borderRadius: "20px", maxWidth: "600px" }}
      >
        <div className="text-center mb-4">
          <div
            className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto"
            style={{
              width: "100px",
              height: "100px",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {userData.first_name?.charAt(0) ||
              userData.username?.charAt(0) ||
              "A"}
          </div>
          <h4 className="mt-3 fw-bold">{userData.first_name || "Admin"}</h4>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
            {userData.role?.toUpperCase() || "SUPER ADMIN"} ACCESS
          </span>
        </div>

        <form className="text-start">
          <div className="mb-3 text-start">
            <label className="form-label small fw-bold">
              Official Email / Username
            </label>
            <input
              type="text"
              className="form-control bg-light shadow-none"
              value={userData.username}
              readOnly
            />
            <div className="form-text">
              Username cannot be changed for security reasons.
            </div>
          </div>

          <div className="mb-4 text-start">
            <label className="form-label small fw-bold">
              Update New Password
            </label>
            <input
              type="password"
              className="form-control shadow-none"
              placeholder="Type new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100 py-2 mt-2 shadow-sm"
            style={{ borderRadius: "10px", fontWeight: "600" }}
            onClick={handleUpdate}
          >
            Update Security Credentials
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
