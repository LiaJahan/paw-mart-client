import pet from '../assets/pet_for_adoption.jpg'
import food from '../assets/petFood.png'
import toy from '../assets/petAccesoris.webp'
import petCare from '../assets/petCareProducts.png'


const bdLocations = [
  "Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi",
  "Barisal", "Rangpur", "Mymensingh", "Cox's Bazar",
  "Comilla", "Narayanganj", "Gazipur", "Jessore",
  "Bogura", "Pabna", "Dinajpur", "Noakhali", "Feni"
];

const categoryData = [
  // 🐶 Pets
  ...Array.from({ length: 9 }, (_, i) => ({
    _id: `pet-${i}`,
    name: `Pet ${i + 1}`,
    category: "Pets",
    price: 0,
    location: bdLocations[i],
    image: pet,
  })),

  // 🍖 Pet Food
  ...Array.from({ length: 9 }, (_, i) => ({
    _id: `food-${i}`,
    name: `Pet Food ${i + 1}`,
    category: "Pet Food",
    price: Math.floor(Math.random() * (300 - 250 + 1)) + 250,
    location: bdLocations[i + 9],
    image: food,
  })),

  // 🧸 Accessories
  ...Array.from({ length: 9 }, (_, i) => ({
    _id: `acc-${i}`,
    name: `Accessory ${i + 1}`,
    category: "Accessories",
    price: Math.floor(Math.random() * (300 - 250 + 1)) + 250,
    location: bdLocations[i],
    image: toy,
  })),

  // 💊 Pet Care
  ...Array.from({ length: 9 }, (_, i) => ({
    _id: `care-${i}`,
    name: `Care Product ${i + 1}`,
    category: "Pet Care Products",
    price: Math.floor(Math.random() * (300 - 250 + 1)) + 250,
    location: bdLocations[i + 9],
    image: petCare,
  })),
];

export default categoryData;