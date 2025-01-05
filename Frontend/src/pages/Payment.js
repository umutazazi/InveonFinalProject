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
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const userId = localStorage.getItem("userId");

  const validateExpiryDate = (date) => {
    if (!date) return "Expiry date is required";

    const [month, year] = date.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return "Invalid format (MM/YY)";
    }

    const numMonth = parseInt(month);
    const numYear = parseInt(year);

    if (numMonth < 1 || numMonth > 12) {
      return "Invalid month";
    }

    if (
      numYear < currentYear ||
      (numYear === currentYear && numMonth < currentMonth)
    ) {
      return "Card has expired";
    }

    return "";
  };

  const validateCVV = (cvv) => {
    if (!/^\d{3}$/.test(cvv)) {
      return "CVV must be 3 digits";
    }
    return "";
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiryDate(value);
    setExpiryDateError(validateExpiryDate(value));
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 3);
    setCvv(value);
    setCvvError(validateCVV(value));
  };
  const validateCreditCard = (number) => {
    const regex = /^[0-9]{16}$/;
    if (!regex.test(number.replace(/\s/g, ""))) {
      return "Card number must be 16 digits";
    }

    // Luhn Algorithm
    let sum = 0;
    let isEven = false;
    const digits = number.replace(/\s/g, "").split("").reverse();

    for (let digit of digits) {
      let num = parseInt(digit);
      if (isEven) {
        num *= 2;
        if (num > 9) {
          num -= 9;
        }
      }
      sum += num;
      isEven = !isEven;
    }

    return sum % 10 === 0 ? "" : "Invalid card number";
  };
  const formatCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/[^\d\s]/g, "");
    value = formatCardNumber(value);

    if (value.replace(/\s/g, "").length <= 16) {
      setCardNumber(value);
      setCardNumberError(validateCreditCard(value));
    }
  };
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
        <div className="row mb-3">
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              Kart Numarası
            </label>
            <input
              type="text"
              className={`form-control ${cardNumberError ? "is-invalid" : ""}`}
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
            {cardNumberError && (
              <div className="invalid-feedback">{cardNumberError}</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="expiryDate" className="form-label">
              Son Kullanma Tarihi
            </label>
            <input
              type="text"
              className={`form-control ${expiryDateError ? "is-invalid" : ""}`}
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
            {expiryDateError && (
              <div className="invalid-feedback">{expiryDateError}</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className={`form-control ${cvvError ? "is-invalid" : ""}`}
              id="cvv"
              value={cvv}
              onChange={handleCVVChange}
              placeholder="123"
              maxLength="3"
              required
            />
            {cvvError && <div className="invalid-feedback">{cvvError}</div>}
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
