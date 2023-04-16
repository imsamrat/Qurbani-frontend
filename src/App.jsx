import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Brandlist from "./pages/Brandlist";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import Productlist from "./pages/Productlist";
import Resetpassword from "./pages/Resetpassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
