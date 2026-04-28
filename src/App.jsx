import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import PetsSupplies from "./pages/PetsSupplies";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListing from "./pages/AddListing";
import MyListings from "./pages/MyListings";

// Components
import PrivateRoute from "./components/PrivateRoute";

function NotFound() {
  return (
    <h1 className="text-2xl font-bold text-red-600 text-center mt-20">
      404 Page Not Found
    </h1>
  );
}

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Layout wraps all normal pages */}
        <Route element={<Layout />}>
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/pets-supplies" element={<PetsSupplies />} />
          <Route path="/listing/:id" element={<ListingDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route
              path="/my-orders"
              element={<h2 className="text-center mt-10">My Orders Page</h2>}
            />
          </Route>
        </Route>

        {/* 404 Page (NO Navbar/Footer) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;