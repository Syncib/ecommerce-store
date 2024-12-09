import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BuyPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const displayItem = async () => {
      const response = await fetch(`http://localhost:4000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    displayItem();
  }, [id]);

  return (
    <div className="buypage">
      <div className="buyframe">
        <img src={product.image} />
      </div>
      <div className="buydetails">
        <h1>{product.name}</h1>
        <h3>{product.description}</h3>
        <h4>{product.category}</h4>
        <h5>Item Left: {product.stock}</h5>
        <button
          className="regbutton"
          onClick={() => {
            navigate("/collections");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BuyPage;
