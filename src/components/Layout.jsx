import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Navbar user={null} />
      <div className="p-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
