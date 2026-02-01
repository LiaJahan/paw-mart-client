import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL
      });

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Registered with Google!");
    } catch (error) {
      toast.error(error.message);
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
          placeholder="Password (min 6 chars)"
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
    </div>
  );
}

export default Register;
