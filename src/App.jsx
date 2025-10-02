import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CoursesPage from "./pages/CoursePage";
import Main from "./components/Main";
import AdminDashboard from "./pages/AdminPanel";
import SinglePage from "./pages/SinglePage";
import { selectIsAuthenticated, selectUser } from "./context/authSlice";

// --- Guards ---
function ProtectedRoute({ children }) {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? children : <Navigate to="/login" replace />;
}
function GuestRoute({ children }) {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Navigate to="/" replace /> : children;
}
function RequireAdmin({ children }) {
  const user = useSelector(selectUser);
  const admin =
    user?.role === "admin" || user?.role === "Admin" || user?.is_admin === true || user?.is_superuser === true;
  return admin ? children : <Navigate to="/" replace />;
}

function Shell() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Mehmonlar uchun */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* Asosiy (auth bilan) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />

        {/* Kurslar ro‘yxati */}
        <Route
          path="/kurslar"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />

        {/* Kurs detali — yo‘l nomi kurslar/:id bo‘lsin */}
        <Route
          path="/kurslar/:id"
          element={
            <ProtectedRoute>
              <SinglePage />
            </ProtectedRoute>
          }
        />

        {/* Admin — faqat adminlar */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        {/* Agar admin ichida nested sahifalar bo‘lsa ham AdminDashboard render qilamiz */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isAuthenticated && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
