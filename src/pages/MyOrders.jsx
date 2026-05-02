import { useEffect, useState } from "react";
import { auth } from "../firebase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic title
  useEffect(() => {
    document.title = "My Orders | PawMart";
  }, []);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders?email=${user.email}`
        );
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Product", "Price", "Quantity", "Address", "Date"]],
      body: orders.map((o) => [
        o.productName,
        `$${o.price}`,
        o.quantity,
        o.address,
        o.date,
      ]),
    });

    doc.save("orders.pdf");
  };

  //  Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  //  User check
  if (!auth.currentUser) {
    return <p className="text-center mt-10">Please login to see orders</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <button onClick={downloadPDF} className="btn btn-primary mb-4">
        Download Report
      </button>

      {orders.length === 0 && (
        <p className="text-center">No orders found</p>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={i}>
                <td>{o.productName}</td>
                <td>${o.price}</td>
                <td>{o.quantity}</td>
                <td>{o.address}</td>
                <td>{o.date}</td>
                <td>{o.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;