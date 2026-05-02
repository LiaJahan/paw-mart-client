import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  //  Dynamic title
  useEffect(() => {
    document.title = "Register | PawMart";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    //  Password validation (REQUIRED)
    if (!/[A-Z]/.test(password)) {
      toast.error("Must include uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Must include lowercase letter");
      return;
    }

    if (password.length < 6) {
      toast.error("Minimum 6 characters required");
      return;
    }

    try {
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Account created successfully!");

      //  redirect
      navigate("/");
    } catch (error) {
      // cleaner messages
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      toast.success("Registered with Google!");

      navigate("/");
    } catch {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Register 🐾</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />

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

        <input
          type="text"
          placeholder="Photo URL (optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary mt-2">
          Register
        </button>
      </form>

      <button
        onClick={handleGoogleRegister}
        className="btn btn-outline btn-secondary mt-3 w-full"
      >
        Register with Google
      </button>

      {/* Required link */}
      <p className="text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-500 cursor-pointer underline"
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;