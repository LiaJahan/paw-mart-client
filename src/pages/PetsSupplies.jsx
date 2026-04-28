import { useEffect, useState } from "react";

function PetsSupplies() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/listings`;

        if (category) {
          url += `?category=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings");
      }
    };

    fetchListings();
  }, [category]);

  // Filter by search (frontend)
  const filteredListings = listings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Pets & Supplies</h1>

      {/* 🔍 Filters */}
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
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>
      </div>

      {/* 📦 Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredListings.map((item) => (
          <div
            key={item._id}
            className="border p-3 rounded shadow"
          >
            <img
              src={item.image}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{item.name}</h3>

            <p>{item.category}</p>
            <p>{item.location}</p>

            <p className="font-semibold">
              {item.price === 0
                ? "Free for Adoption"
                : `$${item.price}`}
            </p>

            <button className="btn btn-sm btn-primary mt-2 w-full">
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetsSupplies;