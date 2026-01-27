import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import Login from './pages/Login'
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";


function Home() {
  return <h1 className="text-2xl font-bold">Home Page 🏠</h1>;
}

function PetsSupplies() {
  return <h1 className="text-2xl font-bold">Pets & Supplies Page 🐾</h1>;
}

function NotFound() {
  return <h1 className="text-2xl font-bold text-red-600">404 Page Not Found</h1>;
}

function App() {
  return (
    <>
      {/* Toaster should be outside Routes */}
      <Toaster />

      <Routes>
        {/* Pages with Navbar + Footer */}
        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/pets-supplies" element={<PetsSupplies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<Route element={<PrivateRoute />}>
    <Route path="/add-listing" element={<h2>Add Listing Page</h2>} />
    <Route path="/my-listings" element={<h2>My Listings Page</h2>} />
    <Route path="/my-orders" element={<h2>My Orders Page</h2>} />
  </Route>

          
        </Route>

          
        {/* 404 Page without Navbar/Footer */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
