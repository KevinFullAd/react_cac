import React from "react";

const IMAGE_HEIGHT = 160;
const CARD_HEIGHT = 340;

const ProductCard = ({ product }) => (
  <div
    className="card"
    style={{
      height: CARD_HEIGHT,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div
    className="!border-1"
      style={{
        height: IMAGE_HEIGHT,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        border: "1px solid #000000"
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
        }}
      />
    </div>
    <div className="card-body" style={{ flex: 1 }}>
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">{product.description}</p>
      <p>
        <strong>${product.price}</strong>
      </p>
    </div>
  </div>
);

export default ProductCard;