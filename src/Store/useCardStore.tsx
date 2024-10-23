import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  cart: Product[];
  wishes: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addToWishes: (product: Product) => void;
  removeFromWishes: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishes: [],
      addToCart: (product: Product) => {
        const { cart } = get();
        const exists = cart.some((item) => item.id === product.id);
        if (!exists) {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        } else {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }
      },
      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((product) => product.id !== productId) });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      updateQuantity: (productId: string, amount: number) => {
        set({
          cart: get().cart.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity + amount }
              : product
          ),
        });
      },
      addToWishes: (product: Product) => {
        const { wishes } = get();
        const exists = wishes.some((item) => item.id === product.id);
        if (!exists) {
          set({ wishes: [...wishes, product] });
        }
      },
      removeFromWishes: (productId: string) => {
        set({
          wishes: get().wishes.filter((product) => product.id !== productId),
        });
      },
    }),
    { name: "cart-storage" }
  )
);
