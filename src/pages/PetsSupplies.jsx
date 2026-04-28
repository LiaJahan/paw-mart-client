import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PetsSupplies() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Dynamic title
  useEffect(() => {
    document.title = "Pets & Supplies | PawMart";
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/listings`;

        if (category) {
          url += `?category=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setListings(Array.isArray(data) ? data : []);
      } catch {
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  const filteredListings = listings.filter((item) =>
    (item?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pets & Supplies</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
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
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>
      </div>

      {/* Listings */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredListings.map((item) => (
          <div key={item._id} className="border p-3 rounded shadow">
            <img
              src={item.image}
              alt={item.name || "Pet"}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{item.name}</h3>

            <p className="text-sm">{item.category}</p>
            <p className="text-sm">{item.location}</p>

            <p className="font-semibold">
              {item.price === 0
                ? "Free for Adoption"
                : `$${item.price}`}
            </p>

            <button
              onClick={() => navigate(`/listing/${item._id}`)}
              className="btn btn-primary mt-2 w-full"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <p className="text-center mt-10">No listings found</p>
      )}
    </div>
  );
}

export default PetsSupplies;