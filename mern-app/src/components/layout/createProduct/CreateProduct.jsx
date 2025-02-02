import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createProduct, getProductDetail, updateProduct } from "../../../action/productAction";

const CreateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.productOperation || {});
  const productDetail = useSelector((state) => state.productDetail || {});
  const isLoading = productDetail?.loading;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    model: "",
    category: "",
    stock: "",
    brand: "",
  });
  const [image, setImage] = useState(null);

  // Fetch product details for editing
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);

  // Pre-fill form when editing
  useEffect(() => {
    if (id && productDetail.product) {
      setFormData({
        name: productDetail.product.name || "",
        price: productDetail.product.price || "",
        description: productDetail.product.description || "",
        model: productDetail.product.model || "",
        category: productDetail.product.category || "",
        stock: productDetail.product.stock || "",
        brand: productDetail.product.brand || "",
      });
    }
  }, [id, productDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    if (id) {
      dispatch(updateProduct(id, data)); // Update product
    } else {
      dispatch(createProduct(data)); // Create product
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{id ? "Edit Product" : "Create Product"}</h2>
      {loading && <p>Loading...</p>}
      {isLoading && <p>Loading product details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Product {id ? "updated" : "created"} successfully!</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {["name", "price", "description", "model", "category", "stock", "brand"].map((field) => (
          <div style={{ marginBottom: "10px" }} key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              {field === "description" ?  (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{ display: "block", width: "100%", padding: "8px" }}
                  rows="4"
                  required={field === "description"}
                />
              ) : (
                <input
                  type={field === "price" || field === "stock" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{ display: "block", width: "100%", padding: "8px" }}
                  required={["name", "price", "stock"].includes(field)}
                />
              )}
            </label>
          </div>
        ))}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Product Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </label>
        </div>
        {id && productDetail.product.image && (
          <div>
            <img src={productDetail.product.image} alt="Product" style={{ width: "100px" }} />
            <p>Current Image</p>
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
