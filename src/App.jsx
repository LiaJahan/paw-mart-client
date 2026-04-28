import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AddListing from "./pages/AddListing";
import MyListings from "./pages/MyListings";
import Home from "./pages/Home";
import PetsSupplies from "./pages/PetsSupplies";

function NotFound() {
  return (
    <h1 className="text-2xl font-bold text-red-600">
      404 Page Not Found
    </h1>
  );
}

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* ✅ THIS now uses your real file */}
          <Route path="/pets-supplies" element={<PetsSupplies />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/my-orders" element={<h2>My Orders Page</h2>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;