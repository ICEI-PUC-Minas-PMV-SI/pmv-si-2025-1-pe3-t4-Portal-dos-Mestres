
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoginScreen from "./pages/LoginScreen";
import SignUpScreen from "./pages/SignUpScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import Dashboard from "./pages/Dashboard";
import GroupList from "./pages/GroupList";
import GroupDetail from "./pages/GroupDetail";
import CharacterCreation from "./pages/CharacterCreation";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import ForumPost from "./pages/ForumPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUpScreen /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordScreen /></PublicRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/groups" element={<ProtectedRoute><GroupList /></ProtectedRoute>} />
              <Route path="/groups/:id" element={<ProtectedRoute><GroupDetail /></ProtectedRoute>} />
              <Route path="/character-creation/:groupId" element={<ProtectedRoute><CharacterCreation /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
              <Route path="/forum/:id" element={<ProtectedRoute><ForumPost /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
