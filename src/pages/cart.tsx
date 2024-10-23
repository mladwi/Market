import { useCart } from "../Store/useCardStore";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.title} - ${product.price}
              <img src={product.thumbnail} alt={product.title} />
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
