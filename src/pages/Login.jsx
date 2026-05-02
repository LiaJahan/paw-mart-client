import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Dynamic title
  useEffect(() => {
    document.title = "Login | PawMart";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Logged in successfully!");

      // redirect after login
      navigate("/");
    } catch (error) {
      // cleaner error message
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      toast.success("Logged in with Google!");

      // redirect
      navigate("/");
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Login 🐾</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary mt-2">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-secondary mt-3 w-full"
      >
        Login with Google
      </button>

      {/* Required link */}
      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-500 cursor-pointer underline"
        >
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;