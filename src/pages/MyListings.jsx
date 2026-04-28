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

  // ✅ Dynamic title
  useEffect(() => {
    document.title = "My Listings | PawMart";
  }, []);

  // Get user
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // Fetch listings
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

  // ✅ Delete with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/listings/${id}?email=${user.email}`,
        {
          method: "DELETE",
        }
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
          headers: {
            "Content-Type": "application/json",
          },
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

  // ✅ Spinner
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

      {isModalOpen && editListing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Edit Listing</h3>

            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                type="text"
                name="name"
                value={editListing.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                name="location"
                value={editListing.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                value={editListing.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
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