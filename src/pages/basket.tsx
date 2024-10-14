import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Basket = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

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
