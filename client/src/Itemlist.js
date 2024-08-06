import React, { useState, useEffect } from "react";
import { Box, Card, CardContent } from "@mui/material";
const baseUrl = "http://localhost:5000/items";

export default function Itemlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  console.log("ITEMS: ", items);
  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {items.map((item) => (
          <Card sx={{ m: 2, p: 2 }}>
            <h3>{item.item_name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>
              {item.description.length > 100
                ? item.description.slice(0, 100) + "..."
                : item.description}
            </p>
          </Card>
        ))}
      </Box>
    </>
  );
}
