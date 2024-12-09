import { Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext";
import Home from "./pages/Home";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import AdminPanel from "./pages/AdminPanel";
import BuyPage from "./pages/BuyPage";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="main-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/collections" element={<Collection />} />
          <Route path="/buy/:id" element={<BuyPage />} />
          <Route
            path="/dashboard"
            element={
              user?.role === "admin" ? (
                <AdminPanel />
              ) : (
                console.log("Redirecting to /", user?.role) || <Navigate to="/" />
              )
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
