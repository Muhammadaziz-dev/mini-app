"use client"

import { useEffect, useState } from "react"
import "./PlaceOrder.css"
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [orderStatus, setOrderStatus] = useState("")

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()

    const orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod: paymentMethod,
    }

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

      if (response.data.success) {
        if (paymentMethod === "cod") {
          // For Cash on Delivery, show order confirmation
          setOrderStatus("confirmed")
        } else {
          // For online payment, redirect to payment gateway
          const { session_url } = response.data
          window.location.replace(session_url)
        }
      } else {
        alert("Error placing order")
      }
    } catch (error) {
      console.error("Order placement error:", error)
      alert("Error placing order")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  if (orderStatus === "confirmed") {
    return (
      <div className="order-confirmation">
        <div className="order-confirmation-content">
          <div className="order-confirmation-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Your order has been placed successfully.</p>
          <p>You've selected Cash on Delivery as your payment method.</p>
          <p className="order-status">
            Current Status: <span>Processing</span>
          </p>
          <div className="order-buttons">
            <button onClick={() => navigate("/myorders")}>View My Orders</button>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="emaill"
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          className="streett"
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="phonee"
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "online" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <span className="payment-checkmark"></span>
                <div className="payment-label">
                  <span>Online Payment</span>
                  <p>Pay with credit card or other online methods</p>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="payment-checkmark"></span>
                <div className="payment-label">
                  <span>Cash on Delivery</span>
                  <p>Pay when your order is delivered</p>
                </div>
              </label>
            </div>
          </div>

          <button type="submit">{paymentMethod === "online" ? "PROCEED TO PAYMENT" : "PLACE ORDER"}</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

