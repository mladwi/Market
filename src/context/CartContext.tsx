import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

interface CartContextType {
  cart: Product[];
  wishes: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void; // clearCart funksiyasini qo'shdik
  addToWishes: (product: Product) => void;
  removeFromWishes: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishes, setWishes] = useState<Product[]>(() => {
    const savedWishes = localStorage.getItem("wishes");
    return savedWishes ? JSON.parse(savedWishes) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishes", JSON.stringify(wishes));
  }, [wishes]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((product) => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]); // Savatchani tozalash
  };

  const addToWishes = (product: Product) => {
    setWishes((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishes = (productId: string) => {
    setWishes((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishes,
        addToCart,
        removeFromCart,
        clearCart, // clearCart funksiyasini Providerga qo'shdik
        addToWishes,
        removeFromWishes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
