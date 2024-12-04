import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import Collection from "./pages/Collection";

function App() {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collections" element={<Collection />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;