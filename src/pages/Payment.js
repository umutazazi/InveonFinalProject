import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";
import { createOrder, createPayment } from "../services/api";

const Payment = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const courseId = cart[0]?.id;
      const orderResponse = await createOrder(userId, courseId);
      console.log("orderResponse", orderResponse);
      if (!orderResponse.isSuccessful) {
        throw new Error("Sipariş oluşturulamadı");
      }

      const paymentResponse = await createPayment(
        userId,
        orderResponse.data.id,
        cart[0].price
      );

      if (!paymentResponse.isSuccessful) {
        throw new Error("Ödeme işlemi başarısız oldu");
      }

      clearCart();
      alertify.success("Siparişiniz başarılı bir şekilde tamamlandı");
      navigate("/");
    } catch (error) {
      console.error("Payment error:", error);
      alertify.error(error.message || "Ödeme işlemi sırasında bir hata oluştu");
    }
  };
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ödeme Bilgileri</h1>

      {/* Display Order Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Sipariş Özeti</h5>
          <p className="card-text">Kurs: {cart[0]?.name}</p>
          <p className="card-text">Tutar: {totalAmount} TL</p>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Kart Numarası
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="expiryDate" className="form-label">
              Son Kullanma Tarihi
            </label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              placeholder="123"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!cart.length}
        >
          {totalAmount} TL Öde
        </button>
      </form>
    </div>
  );
};

export default Payment;
