import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PetsSupplies() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/listings`;

        if (category) {
          url += `?category=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        console.log("DATA FROM BACKEND:", data); // 🔍 debug

        setListings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setListings([]);
      }
    };

    fetchListings();
  }, [category]);

  // SAFE filtering (no crash)
  const filteredListings = listings.filter((item) =>
    (item?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pets & Supplies</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>
      </div>

      {/* Listings */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredListings.map((item) => (
          <div key={item._id} className="border p-3 rounded">
            <img
              src={item.image}
              alt=""
              className="h-40 w-full object-cover"
            />

            <h3 className="font-bold">{item.name}</h3>

            <button
              onClick={() => {
                console.log("NAVIGATE:", item._id);
                navigate(`/listing/${item._id}`);
              }}
              className="btn btn-primary mt-2 w-full"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <p className="text-center mt-10">No listings</p>
      )}
    </div>
  );
}

export default PetsSupplies;