import React, { use, useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="container py-4">
      <h1 className="text-center mb-5 fw-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h3>Your cart is empty</h3>
          <p>Discover amazing courses and start learning today!</p>
          <Link to="/" className="btn btn-primary btn-lg">
            <i className="fas fa-search me-2"></i>
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card course-card mb-4">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  Course Items ({cart.length})
                </h4>
              </div>
              <div className="card-body p-0">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item border-bottom">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={
                            item.imageUrl ||
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                          }
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="mb-1 fw-semibold">{item.name}</h5>
                        <p className="text-muted mb-0 small">
                          {item.description || "Premium course content"}
                        </p>
                      </div>
                      <div className="col-md-2">
                        <span className="h5 text-success fw-bold">
                          ${item.price}
                        </span>
                      </div>
                      <div className="col-md-2 text-end">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeFromCart(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card course-card">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="fas fa-calculator me-2"></i>
                  Order Summary
                </h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span className="fw-semibold">
                    $
                    {cart
                      .reduce((total, item) => total + item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <span className="fw-semibold">$0.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="h5">Total:</span>
                  <span className="h5 text-success fw-bold">
                    $
                    {cart
                      .reduce((total, item) => total + item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <button
                  className="btn btn-success w-100 mb-3"
                  onClick={() => navigate("/payment")}
                >
                  <i className="fas fa-credit-card me-2"></i>
                  Proceed to Checkout
                </button>

                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={clearCart}
                >
                  <i className="fas fa-trash me-2"></i>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
