import { useState, useEffect } from "react";

const TestingPost = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
    ratings: 0,
    images: [],
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [product, setProducts] = useState([]); // Initialize as an empty array
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Fetching products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", data); // Log the API response for debugging
        setProducts(data.products || []); // Ensure products are set to an empty array if not found
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setResponseMessage("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle product submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5000/api/v1/products/update/${editProductId}`
      : "http://localhost:5000/api/v1/products/create";

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create/update product");
      }

      const data = await response.json();
      setResponseMessage(
        isEditing
          ? "Product updated successfully!"
          : "Product created successfully!"
      );

      if (isEditing) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editProductId ? data.product : product
          )
        );
        setIsEditing(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, data.product]);
      }

      // Reset form data after submission
      setFormData({
        name: "",
        description: "",
        model: "",
        price: "",
        category: "",
        stock: "",
        brand: "",
        ratings: 0,
        images: [],
      });
    } catch (error) {
      console.error("Error creating/updating product:", error.message);
      setResponseMessage("Failed to create/update product. Please try again.");
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setResponseMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      setResponseMessage("Failed to delete product. Please try again.");
    }
  };

  // Edit product and fill the form
  const handleEdit = (product) => {
    setFormData({
      name: product.name || "",
      description: product.description || "",
      model: product.model || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
      brand: product.brand || "",
      ratings: product.ratings || 0,
      images: product.images || [],
    });
    setIsEditing(true);
    setEditProductId(product._id);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1>{isEditing ? "Edit Product" : "Create Product"}</h1>
      {responseMessage && <p>{responseMessage}</p>}

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <input
          type="number"
          name="ratings"
          value={formData.ratings}
          onChange={handleChange}
          placeholder="Ratings (0-5)"
          min="0"
          max="5"
        />
        <input
          type="file"
          name="images"
          onChange={(e) =>
            setFormData({
              ...formData,
              images: [...formData.images, e.target.files[0]],
            })
          }
          multiple
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update Product" : "Create Product"}
        </button>
      </form>

      <h2>Product List</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {Array.isArray(product) && product.length > 0 ? (
          product.map((product) =>
            product ? (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                }}
              >
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Model:</strong> {product.model}
                </p>
                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>Ratings:</strong> {product.ratings}
                </p>
                <div>
                  {product.images &&
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Product ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                    ))}
                </div>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            ) : null
          )
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default TestingPost;
