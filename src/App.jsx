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
import MyOrders from "./pages/MyOrders";
import CategoryFiltered from "./pages/CategoryFiltered"; // IMPORTANT

// Components
import PrivateRoute from "./components/PrivateRoute";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-2">Page Not Found</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/pets-supplies" element={<PetsSupplies />} />

          {/* REQUIRED ROUTE */}
          <Route
            path="/category-filtered-product/:categoryName"
            element={<CategoryFiltered />}
          />

          <Route path="/listing/:id" element={<ListingDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>
        </Route>

        {/* 404 (no navbar/footer) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;