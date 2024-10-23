import { useCart } from "../Store/useCardStore";

const Liked = () => {
  const { wishes, removeFromWishes } = useCart();

  return (
    <div className="container">
      <h2 className="favourite_h2">Favorite </h2>
      {wishes.length === 0 ? (
        <p className="favourite_p">Your wish list is empty.</p>
      ) : (
        <ul className="liked_list">
          {wishes.map((product) => (
            <li key={product.id} className="wish_card">
              <img src={product.thumbnail} alt={product.title} />
              <div className="wish_details">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <button onClick={() => removeFromWishes(product.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Liked;
