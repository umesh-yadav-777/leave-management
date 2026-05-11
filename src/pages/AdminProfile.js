import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProfile() {
    const [userData, setUserData] = useState({
        first_name: '',
        username: '',
        role: ''
    });
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // 1. Backend se logged-in Admin ka data lana
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/accounts/profile/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Profile fetch error:", err);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // 2. Profile update karne ka logic (Password change)
    const handleUpdate = async () => {
        if (!newPassword) {
            alert("Please enter a new password first!");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            // Humne backend mein password change karne ka logic banaya hai usse connect karenge
            await axios.post('http://127.0.0.1:8000/accounts/change-password/',
                { new_password: newPassword },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            alert("Password updated successfully!");
            setNewPassword('');
        } catch (err) {
            alert("Failed to update password. Make sure backend is running.");
        }
    };

    if (loading) return <div className="p-5 text-center">Loading Profile...</div>;

    return (
        <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
            <h2 style={{ color: 'navy', fontWeight: '800' }} className="mb-4">My Account Settings</h2>

            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px', maxWidth: '600px' }}>
                <div className="text-center mb-4">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto"
                         style={{ width: '100px', height: '100px', fontSize: '40px', fontWeight: 'bold' }}>
                        {userData.first_name?.charAt(0) || userData.username?.charAt(0) || 'A'}
                    </div>
                    <h4 className="mt-3 fw-bold">{userData.first_name || 'Admin'}</h4>
                    <span className="badge bg-success-subtle text-success">
                        {userData.role?.toUpperCase() || 'SUPER ADMIN'} ACCESS
                    </span>
                </div>

                <form>
                    <div className="mb-3">
                        <label className="form-label small fw-bold">Official Email / Username</label>
                        <input
                            type="text"
                            className="form-control bg-light"
                            value={userData.username}
                            readOnly
                        />
                        <div className="form-text">Username cannot be changed for security.</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-bold">Update New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Type new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary w-100 py-2 mt-3 shadow-sm"
                        style={{ borderRadius: '10px', fontWeight: '600' }}
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
