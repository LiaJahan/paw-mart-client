import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // this will be null or the logged-in user
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <div className="p-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
