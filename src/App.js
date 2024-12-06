import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";
import BuyPage from "./pages/BuyPage";

function App() {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/buy/:id" element={<BuyPage />} />
          <Route path="/dashboard" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
