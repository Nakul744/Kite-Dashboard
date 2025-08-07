import React, { useState, useContext } from "react";

import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const context = useContext(GeneralContext);

  const handleBuyClick = async () => {
    const token = localStorage.getItem("token");
    

    try {
      if (!token) {
        alert("User not authenticated. Please login first.");
        return;
      }

      

      await axios.post("http://localhost:8080/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully!");
      context.closeBuyWindow();
    } catch (err) {
      console.error("Buy order error:", err.response || err);
      alert("Failed to place the order!");
    }
  };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  return (
    <div className="buy-window-overlay">
      <div className="buy-window" draggable="true">
        <h3 className="buy-window-title">Buy Stock</h3>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              min="1"
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              min="0"
            />
          </fieldset>
        </div>

        <div className="buttons">
          <span className="margin-info">
            Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}
          </span>
          <div className="btn-group">
            <button className="btn btn-blue" onClick={handleBuyClick}>
              Buy
            </button>
            <button className="btn btn-grey" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
