import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar({ user }) {
  return (
    <nav className="bg-[#C19A6B] text-black p-5 flex justify-between items-center">
      
      <div className="font-bold text-3xl">
        <Link to="/">PawMart 🐕🐾</Link>
      </div>

      
      <div className="flex font-semibold text-xl gap-5">
        <Link to="/">Home</Link>
        <Link to="/pets-supplies">Pets & Supplies</Link>

        
        {user && (
          <>
            <Link to="/add-listing">Add Listing</Link>
            <Link to="/my-listings">My Listings</Link>
            <Link to="/my-orders">My Orders</Link>
          </>
        )}
      </div>

      
      <div className="flex gap-3">

        {user ? (
          <>
            <span>{user.displayName || "User"}</span>
            <button
              className="btn btn-sm btn-outline"
              onClick={async () => {
                try {
                  await signOut(auth);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-xl font-semibold text-xl btn-primary">Login</Link>
            <Link to="/register" className="btn btn-xl btn-secondary font-semibold text-xl">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
