import { useParams } from "react-router-dom";
import categoryData from "../data/categoryData";

function CategoryFiltered() {
  const { categoryName } = useParams();

  const filtered = categoryData.filter(
    (item) => item.category === categoryName
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">
        {categoryName}
      </h1>

      {/* ✅ 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-3 shadow hover:shadow-lg"
          >
            <img
              src={item.image}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{item.name}</h3>

            <p>{item.location}</p>

            <p className="font-semibold">
              {item.price === 0
                ? "Free for Adoption"
                : `BDT ${item.price}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFiltered;