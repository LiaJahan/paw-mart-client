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

  // ✅ Dynamic title
  useEffect(() => {
    document.title = "Listing Details | PawMart";
  }, []);

  // Get user
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // Fetch listing
  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/listings/${id}`
        );
        if (!res.ok) throw new Error();

        const data = await res.json();
        setListing(data);
      } catch {
        toast.error("Failed to load listing");
      }
    };

    fetchOne();
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const order = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user.displayName || "Anonymous",
      email: user.email,
      quantity: 1,
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );

      if (res.ok) {
        toast.success("Order placed!");
        setShowForm(false);
      } else {
        toast.error("Order failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  // ✅ Spinner instead of text
  if (!listing) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <img
        src={listing.image}
        alt={listing.name || "Listing"}
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

      {showForm && (
        <form
          onSubmit={handleOrder}
          className="space-y-3 border p-4 rounded"
        >
          <input
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            value={listing.name}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            value={listing.price}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <input
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
          />

          <button className="btn btn-success w-full">
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}

export default ListingDetails;