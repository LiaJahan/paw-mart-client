import { useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../firebase";

function AddListing() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pets");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const listing = {
      name,
      category,
      price: Number(price),
      location,
      description,
      image,
      date,
      email: auth.currentUser.email,
    };

    try {
      
      const res = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listing),
      });

      if (res.ok) {
        toast.success("Listing added successfully!");
        
        setName("");
        setCategory("Pets");
        setPrice(0);
        setLocation("");
        setDescription("");
        setImage("");
        setDate("");
      } else {
        toast.error("Failed to add listing.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Add Listing 🐾</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Pet/Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
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
        <input
          type="number"
          placeholder="Price (0 if pet)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary mt-2">
          Add Listing
        </button>
      </form>
    </div>
  );
}

export default AddListing;
