import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/home/Home";
import { HomeProvider } from "./context/home-context";
import { AuthProvider } from "./context/auth-context";
import { Toaster } from "./components/ui/sonner";
import BattleHistoryPage from "./pages/BattleHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <HomeProvider>
                <MainLayout />
                <Toaster richColors position="bottom-right" />
              </HomeProvider>
            </AuthProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="battle-history" element={<BattleHistoryPage />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
