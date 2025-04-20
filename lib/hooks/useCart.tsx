import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  increseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const isItemExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );
        if (isItemExisting) {
          return toast("Item already in cart", { icon: "🛒" });
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast("Item added to cart", { icon: "🛒" });
      },

      removeItem: (itemId: string) => {
        const updatedItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== itemId
        );

        set({ cartItems: updatedItems });
        toast("Item removed from cart", { icon: "🛒" });
      },

      increseQuantity: (itemId: string) => {
        const updatedItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        set({ cartItems: updatedItems });
        toast("Item quantity incresed", { icon: "🛒" });
      },

      decreaseQuantity: (itemId: string) => {
        const updatedItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );

        set({ cartItems: updatedItems });
        toast("Item quantity decreased", { icon: "🛒" });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;