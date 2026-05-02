import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PetsSupplies() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Dynamic title
  useEffect(() => {
    document.title = "Pets & Supplies | PawMart";
  }, []);

  // Default image fallback
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

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/listings`;

        if (category) {
          url += `?category=${category}`;
        }

        const res = await fetch(url);

        if (!res.ok) throw new Error();

        const data = await res.json();

        setListings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Fetch failed → fallback empty");
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  // Search filter
  const filteredListings = listings.filter((item) =>
    (item?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Pets & Supplies</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setLoading(true); // 🔥 ensures spinner shows on filter change
          }}
        >
          <option value="">All Categories</option>
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredListings.map((item) => {
          const imageSrc =
            item?.image && item.image.startsWith("http")
              ? item.image
              : getDefaultImage(item?.category);

          return (
            <div
              key={item._id}
              className="border p-3 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={imageSrc}
                onError={(e) => {
                  e.target.src = getDefaultImage(item?.category);
                }}
                alt={item.name || "Pet"}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="font-bold mt-2">{item.name}</h3>

              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-600">{item.location}</p>

              <p className="font-semibold mt-1">
                {item.price === 0
                  ? "Free for Adoption"
                  : `$${item.price}`}
              </p>

              <button
                onClick={() => navigate(`/listing/${item._id}`)}
                className="btn btn-primary mt-3 w-full"
              >
                See Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredListings.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No listings found
        </p>
      )}
    </div>
  );
}

export default PetsSupplies;