import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  // Fetch recent listings (limit 6)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/listings?limit=6`
        );
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings");
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="space-y-10">

      {/* 🔥 Banner */}
      <div className="relative h-[400px] rounded overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1601758003122-53c40e686a19"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
    <h1 className="text-4xl font-bold mb-3">
      Find Your Furry Friend Today!
    </h1>
    <p className="text-lg">
      Adopt, Don’t Shop — Give a Pet a Home 🐾
    </p>
  </div>
</div>

      {/* 🧩 Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "Pets",
          "Pet Food",
          "Accessories",
          "Pet Care Products",
        ].map((cat) => (
          <div
            key={cat}
            onClick={() =>
              navigate(`/category-filtered-product/${cat}`)
            }
            className="cursor-pointer p-5 border rounded text-center hover:bg-base-200"
          >
            <h2 className="font-bold">{cat}</h2>
          </div>
        ))}
      </div>

      {/* 🆕 Recent Listings */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Recent Listings
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {listings.map((item) => (
            <div
              key={item._id}
              className="border rounded p-3 shadow"
            >
              <img
                src={item.image}
                alt={item.name}
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
                onClick={() =>
                  navigate(`/listing/${item._id}`)
                }
                className="btn btn-sm btn-primary mt-2 w-full"
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 💡 Extra Section 1 */}
      <div className="bg-base-200 p-6 rounded text-center">
        <h2 className="text-xl font-bold mb-2">
          Why Adopt from PawMart?
        </h2>
        <p>
          Adopting saves lives and gives pets a second chance.
          Help reduce stray animals and bring happiness home.
        </p>
      </div>

      {/* 💡 Extra Section 2 */}
      <div className="bg-base-200 p-6 rounded text-center">
        <h2 className="text-xl font-bold mb-2">
          Meet Our Pet Heroes
        </h2>
        <p>
          Amazing adopters and caregivers making a difference
          in animals’ lives every day.
        </p>
      </div>
    </div>
  );
}

export default Home;