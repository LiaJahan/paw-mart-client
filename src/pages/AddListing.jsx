import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AddListing() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pets");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  // get current user safely
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    // validation (simple but useful)
    if (!name || !location || !description || !image || !date) {
      toast.error("Please fill all fields");
      return;
    }

    const listing = {
      name,
      category,
      price: category === "Pets" ? 0 : Number(price),
      location,
      description,
      image,
      date,
      email: user.email,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/listings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing),
        }
      );

      if (res.ok) {
        toast.success("Listing added successfully!");

        navigate("/my-listings");

        // reset form
        setName("");
        setCategory("Pets");
        setPrice("");
        setLocation("");
        setDescription("");
        setImage("");
        setDate("");
      } else {
        toast.error("Failed to add listing");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // loading fallback
  if (!user) {
    return <p className="text-center mt-10">Loading user...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Add Listing 🐾</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Name */}
        <input
          type="text"
          placeholder="Pet/Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>

        {/* Price */}
        {category !== "Pets" && (
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        )}

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        {/* Image */}
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        {/* Email (readonly) */}
        <input
          type="text"
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        {/* Submit */}
        <button type="submit" className="btn btn-primary mt-2">
          Add Listing
        </button>
      </form>
    </div>
  );
}

export default AddListing;