import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  // get user
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/listings`
        );
        const data = await res.json();

        const found = data.find((item) => item._id === id);
        setListing(found);
      } catch {
        toast.error("Failed to load listing");
      }
    };

    fetchListing();
  }, [id]);

  // submit order
  const handleOrder = async (e) => {
    e.preventDefault();

    const order = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user?.displayName || "Anonymous",
      email: user?.email,
      quantity: listing.category === "Pets" ? 1 : 1,
      price: listing.price,
      address,
      phone,
      date,
      additionalNotes: notes,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (res.ok) {
        toast.success("Order placed successfully!");
        setShowForm(false);
      } else {
        toast.error("Order failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <img
        src={listing.image}
        className="w-full h-80 object-cover rounded"
      />

      <h1 className="text-3xl font-bold">{listing.name}</h1>

      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Owner:</strong> {listing.email}</p>

      <p>{listing.description}</p>

      <p className="font-bold text-xl">
        {listing.price === 0
          ? "Free for Adoption"
          : `$${listing.price}`}
      </p>

      <button
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
      >
        Adopt / Order Now
      </button>

      {/* Order Form */}
      {showForm && (
        <form onSubmit={handleOrder} className="space-y-3 border p-4 rounded">
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            type="text"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            type="text"
            value={listing.name}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            type="number"
            value={listing.category === "Pets" ? 1 : 1}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            type="text"
            value={listing.price}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <textarea
            placeholder="Additional Notes"
            onChange={(e) => setNotes(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>

          <button className="btn btn-success w-full">
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}

export default ListingDetails;