import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Basket = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000);
    toast.success("Order placed successfully!");
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, amount: number) => {
    updateQuantity(productId, amount);
  };

  return (
    <div className="container">
      <h2 className="basket_h2">Basket</h2>
      {cart.length === 0 ? (
        <p className="basket_p">Your basket is empty.</p>
      ) : (
        <>
          <ul className="basket_list">
            {cart.map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price}
                <img src={product.thumbnail} alt={product.title} />
                <div className="quality_box">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="total_section">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="order_button" onClick={handleOrder}>
              Place Order
            </button>
            {orderPlaced && (
              <p className="order_message">Your order has been placed!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
