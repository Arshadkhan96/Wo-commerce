import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getProduct, deleteProduct } from "../../../action/productAction";
import { useNavigate } from "react-router-dom";
import "./ProductTable.css"; // Import your styles

const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get product list and loading/error states from Redux
  const { products, loading, error } = useSelector((state) => state.products || {});

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleUpdate = (id) => {
    console.log(`Update clicked for product ID: ${id}`);
    navigate(`/products/update/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      // Optional: refetch after delete if necessary, otherwise let Redux state handle it
      // dispatch(getProduct());
    }
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={8} align="center" style={{ color: "red" }}>
                {error}
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No products available
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">{product.brand}</TableCell>
                <TableCell align="right">{product.model}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(product._id)}
                    className="action-button"
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(product._id)}
                    className="action-button"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
