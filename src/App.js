import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/UserDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import About from "./pages/About";
import Layout from "./components/UserLayout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import FeatureDetail from "./pages/FeatureDetail";
import AdminFeatureManageUsers from './pages/AdminFeatureManageUsers';
import AdminFeatureLeaveRequests from './pages/AdminFeatureLeaveRequests';
import AdminFeatureReports from './pages/AdminFeatureReports';
import AdminFeatureSettings from './pages/AdminFeatureSettings';
import AdminProfile from "./pages/AdminProfile";
import UserTeamCalendar from "./pages/UserTeamCalendar";

// --- STEP 3: SECURITY GUARD (PROTECTED ROUTE) ---
// Ye function check karega ki user ka role match karta hai ya nahi
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("userRole"); // Humne Login page par ye set kiya tha

  if (!userRole) {
    // Agar login nahi hai, toh seedha Landing Page bhej do
    return <Navigate to="/" replace />;
  }

  if (userRole !== allowedRole) {
    // Agar role match nahi karta (e.g. User Admin page kholne ki koshish kare), toh bahar phenk do
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Pages (Sabke liye khula hai) --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/feature/:id" element={<FeatureDetail />} />

        {/* --- Protected User Pages (Sirf "user" role ke liye) --- */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRole="user"><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRole="user"><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRole="user"><Layout><Settings /></Layout></ProtectedRoute>} />
        <Route path="/apply" element={<ProtectedRoute allowedRole="user"><Layout><ApplyLeave /></Layout></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute allowedRole="user"><Layout><LeaveHistory /></Layout></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute allowedRole="user"><Layout><About /></Layout></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute allowedRole="user"><Layout><UserTeamCalendar /></Layout></ProtectedRoute>} />

        {/* --- Protected Admin Pages (Sirf "admin" role ke liye) --- */}
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRole="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><AdminLayout><AdminFeatureManageUsers /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/leaves" element={<ProtectedRoute allowedRole="admin"><AdminLayout><AdminFeatureLeaveRequests /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute allowedRole="admin"><AdminLayout><AdminFeatureReports /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><AdminLayout><AdminFeatureSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute allowedRole="admin"><AdminLayout><AdminProfile /></AdminLayout></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
