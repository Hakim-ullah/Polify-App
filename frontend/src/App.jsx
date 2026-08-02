import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreatePollPage from "./pages/CreatePollPage.jsx";
import PollListPage from "./pages/PollListPage.jsx";
import SinglePollPage from "./pages/SinglePollPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 text-sm">
        Loading Pollify...
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected App Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout onSearch={(query) => setSearchQuery(query)} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={<DashboardPage searchQuery={searchQuery} />}
        />
        <Route path="/create-poll" element={<CreatePollPage />} />
        <Route
          path="/my-polls"
          element={
            <PollListPage
              feed="my-polls"
              title="My Polls"
              emptyMessage="You haven't created any polls yet."
            />
          }
        />
        <Route
          path="/voted-polls"
          element={
            <PollListPage
              feed="voted"
              title="Voted Polls"
              emptyMessage="You haven't voted on any polls yet."
            />
          }
        />
        <Route
          path="/bookmarked-polls"
          element={
            <PollListPage
              feed="bookmarked"
              title="Saved Polls"
              emptyMessage="You haven't saved any polls yet."
            />
          }
        />
        <Route path="/poll/:id" element={<SinglePollPage />} />
        <Route path="/poll/:id/analytics" element={<AnalyticsPage />} />
        <Route path="/user/:username" element={<UserProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
