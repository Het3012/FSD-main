const express = require("express");
const router = express.Router();

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$129.99",
    image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
    category: "Electronics",
    rating: 4.8,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: "$199.99",
    image: "https://via.placeholder.com/300x200?text=Fitness+Watch",
    category: "Wearables",
    rating: 4.6,
    description: "Track your fitness goals with this smart watch featuring heart rate monitoring and GPS."
  },
  {
    id: 3,
    name: "Eco-Friendly Water Bottle",
    price: "$24.99",
    image: "https://via.placeholder.com/300x200?text=Water+Bottle",
    category: "Lifestyle",
    rating: 4.9,
    description: "Sustainable stainless steel water bottle that keeps drinks cold for 24 hours."
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: "$39.99",
    image: "https://via.placeholder.com/300x200?text=Charging+Pad",
    category: "Electronics",
    rating: 4.5,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices."
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: "$79.99",
    image: "https://via.placeholder.com/300x200?text=Bluetooth+Speaker",
    category: "Electronics",
    rating: 4.7,
    description: "Portable waterproof speaker with 360-degree sound and 20-hour playtime."
  },
  {
    id: 6,
    name: "Laptop Stand",
    price: "$49.99",
    image: "https://via.placeholder.com/300x200?text=Laptop+Stand",
    category: "Accessories",
    rating: 4.4,
    description: "Ergonomic aluminum laptop stand with adjustable height and angle."
  }
];

const categories = ["All", "Electronics", "Wearables", "Lifestyle", "Accessories"];

// Home route: Render the main page with products
router.get("/", (req, res) => {
  const selectedCategory = req.query.category || "All";
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  res.render("index", { 
    title: "TechMart - Premium Products", 
    products: filteredProducts,
    categories: categories,
    selectedCategory: selectedCategory,
    totalProducts: products.length
  });
});

// Product detail route
router.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).render("error", { 
      message: "Product not found",
      error: { status: 404 }
    });
  }
  
  res.render("product", { 
    title: `${product.name} - TechMart`,
    product: product
  });
});

// About route
router.get("/about", (req, res) => {
  res.render("about", { 
    title: "About TechMart",
    teamMembers: [
      { name: "Alex Johnson", role: "CEO & Founder" },
      { name: "Sarah Chen", role: "CTO" },
      { name: "Mike Rodriguez", role: "Head of Design" },
      { name: "Emily Davis", role: "Product Manager" }
    ]
  });
});

// Contact route
router.get("/contact", (req, res) => {
  res.render("contact", { 
    title: "Contact Us - TechMart"
  });
});

module.exports = router;
