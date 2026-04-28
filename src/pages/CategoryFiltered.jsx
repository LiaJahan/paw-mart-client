import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryFiltered() {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${categoryName} | PawMart`;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/listings?category=${categoryName}`
        );
        const data = await res.json();
        setListings(Array.isArray(data) ? data : []);
      } catch {
        setListings([]);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {categoryName}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {listings.map((item) => (
          <div key={item._id} className="border p-3 rounded">
            <img
              src={item.image}
              className="h-40 w-full object-cover"
            />

            <h3 className="font-bold">{item.name}</h3>

            <button
              onClick={() => navigate(`/listing/${item._id}`)}
              className="btn btn-primary mt-2 w-full"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <p className="text-center mt-10">No items found</p>
      )}
    </div>
  );
}

export default CategoryFiltered;