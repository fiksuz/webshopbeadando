import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/css/Home.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ratings: Record<string, number>;
  categories: string[];
  stock: number;
}

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const HOME: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/products/categories");
      if (!response.ok) {
        throw new Error("Hiba a kategóriák lekérdezése során");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="home-background">
    <h2 className="title">Termékkategóriák</h2>
    <div className="category-container">
      {categories.map((category) => (
        <div className="category-item" key={category.id}>
          <img src={category.image} alt={category.name} />
          <p>{category.name}</p>
          <p className="product-count">Elérhető termékek száma: {category.productCount}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default HOME;
