import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.png";

function Home() {
  const navigate = useNavigate();

  const categories = [
    { label: "🐶 Pets (Adoption)", value: "Pets" },
    { label: "🍖 Pet Food", value: "Pet Food" },
    { label: "🧸 Accessories", value: "Accessories" },
    { label: "💊 Pet Care Products", value: "Pet Care Products" },
  ];

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Page title
  useEffect(() => {
    document.title = "Home | PawMart";
  }, []);

  // Default images
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

  // fallback (only used if backend fails completely)
  const fallbackListings = [
    {
      _id: "demo1",
      name: "Demo Pet",
      category: "Pets",
      price: 0,
      location: "Demo Location",
      image: "",
    },
  ];

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/listings`
        );

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();

        // ✅ Ensure it's array
        const safeData = Array.isArray(data) ? data : [];

        // ✅ Always limit to 6
        const limited = safeData.slice(0, 6);

        setListings(limited);
      } catch (error) {
        console.log("Backend OFF → using fallback");
        setListings(fallbackListings);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Banner */}
      <div className="carousel w-full rounded-xl overflow-hidden">

  {/* Slide 1 */}
  <div id="slide1" className="carousel-item relative w-full h-[400px] md:h-[500px]">
    <img src={banner1} className="w-full h-full object-cover" />

    <div className="absolute inset-0 bg-black/40 flex justify-center items-center text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold">
        Find Your Furry Friend Today!
      </h1>
    </div>

    <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>

  {/* Slide 2 */}
  <div id="slide2" className="carousel-item relative w-full h-[400px] md:h-[500px]">
    <img src={banner2} className="w-full h-full object-cover" />

    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold">
        Adopt, Don’t Shop
      </h1>
      <p>Give a Pet a Home</p>
    </div>

    <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>

  {/* Slide 3 */}
  <div id="slide3" className="carousel-item relative w-full h-[400px] md:h-[500px]">
    <img src={banner3} className="w-full h-full object-cover" />

    <div className="absolute inset-0 bg-black/40 flex justify-center items-center text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold">
        Because Every Pet Deserves Love
      </h1>
    </div>

    <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>

</div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() =>
              navigate(`/category-filtered-product/${cat.value}`)
            }
            className="cursor-pointer bg-[#FFC49F] p-5 rounded-xl shadow hover:shadow-lg text-center"
          >
            <h2 className="text-xl md:text-2xl">{cat.label}</h2>
          </div>
        ))}
      </div>

      {/* Recent Listings */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {listings.map((item) => {
            const validImage =
              item.image && item.image.startsWith("http")
                ? item.image
                : getDefaultImage(item.category);

            return (
              <div key={item._id} className="border rounded p-3 shadow">

                <img
                  src={validImage}
                  alt={item.name || "listing"}
                  onError={(e) => {
                    e.target.src = getDefaultImage(item.category);
                  }}
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
            );
          })}
        </div>

        {listings.length === 0 && (
          <p className="text-center mt-5">
            No listings available
          </p>
        )}
      </div>

      {/* Extra Sections */}
      <div className="bg-[#FFC49F] p-6 rounded text-center">
        <h2 className="text-xl font-bold mb-2">
          Why Adopt from PawMart?
        </h2>
        <p>Adopting saves lives and gives pets a second chance.</p>
      </div>

      <div className="bg-[#FFC49F] p-6 rounded text-center">
        <h2 className="text-xl font-bold mb-2">
          Meet Our Pet Heroes
        </h2>
        <p>Amazing adopters making a difference every day.</p>
      </div>
    </div>
  );
}

export default Home;