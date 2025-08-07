import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allorders, setallorders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle case where token is not present (e.g., user not logged in)
          console.log("No token found. User not authenticated.");
          setallorders([]); // Clear orders if not authenticated
          return;
        }

        const response = await axios.get("https://kite-backend-qlhd.onrender.com/allorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setallorders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error, e.g., show an error message to the user
        setallorders([]); // Clear orders on error
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {allorders.length > 0 ? (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allorders.map((stock, index) => {
                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.price}</td>
                    <td>{stock.mode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Buy Stocks
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;