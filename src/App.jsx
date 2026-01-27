import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

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
    <Routes>
      {/* Pages with Navbar + Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets-supplies" element={<PetsSupplies />} />
      </Route>

      {/* 404 Page without Navbar/Footer */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
