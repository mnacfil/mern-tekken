import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/home/Home";
import { HomeProvider } from "./context/home-context";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <AuthProvider>
                <HomeProvider>
                  <HomePage />
                </HomeProvider>
              </AuthProvider>
            }
          />
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
