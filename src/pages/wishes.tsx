import { useCart } from "../context/CartContext";

const Wishes = () => {
  const { wishes, removeFromWishes } = useCart();

  return (
    <div>
      <h2>Wishes</h2>
      {wishes.length === 0 ? (
        <p>Your wish list is empty.</p>
      ) : (
        <ul>
          {wishes.map((product) => (
            <li key={product.id}>
              {product.title}
              <button onClick={() => removeFromWishes(product.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishes;
