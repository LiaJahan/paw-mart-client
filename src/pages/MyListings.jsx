import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase";

function MyListings() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editListing, setEditListing] = useState(null);

  useEffect(() => {
    document.title = "My Listings | PawMart";
  }, []);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // ✅ Default image fallback
  const getDefaultImage = (category) => {
    switch (category) {
      case "Pets":
        return "https://i.ibb.co/v4jDr2h1/pet-for-adoption.jpg";
      case "Pet Food":
        return "https://i.ibb.co/m5dSQG8Z/pet-Food.png";
      case "Accessories":
        return "https://i.ibb.co/V7T5XcZ/pet-Accesoris.webp";
      case "Pet Care Products":
        return "https://i.ibb.co/cKxgksLp/pet-Care-Products.png";
      default:
        return "https://via.placeholder.com/400";
    }
  };

  const fetchListings = async (email) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/listings?email=${email}`
      );
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch listings");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchListings(user.email);
    }
  }, [user, location.key]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/listings/${id}?email=${user.email}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("Listing deleted!");
        setListings((prev) => prev.filter((l) => l._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleEdit = (listing) => {
    setEditListing(listing);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditListing({ ...editListing, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/listings/${editListing._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editListing),
        }
      );

      if (res.ok) {
        toast.success("Listing updated!");
        setListings((prev) =>
          prev.map((l) =>
            l._id === editListing._id ? editListing : l
          )
        );
        setIsModalOpen(false);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10">User not logged in</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>

      {listings.length === 0 && (
        <p className="text-center mt-5">No listings found</p>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th> {/* ✅ NEW */}
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>

                {/* ✅ IMAGE FIX */}
                <td>
                  <img
                    src={
                      listing.image && listing.image.startsWith("http")
                        ? listing.image
                        : getDefaultImage(listing.category)
                    }
                    onError={(e) => {
                      e.target.src = getDefaultImage(listing.category);
                    }}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td>{listing.name}</td>
                <td>{listing.category}</td>

                <td>
                  {listing.price === 0
                    ? "Free for Adoption"
                    : `$${listing.price}`}
                </td>

                <td>{listing.location}</td>

                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(listing)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ FIXED MODAL (added image field) */}
      {isModalOpen && editListing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Edit Listing</h3>

            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                name="name"
                value={editListing.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <input
                name="location"
                value={editListing.location}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <textarea
                name="description"
                value={editListing.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />

              {/* ✅ NEW: edit image */}
              <input
                name="image"
                placeholder="Image URL"
                value={editListing.image || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyListings;