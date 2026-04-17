"use client";

import { useCart } from "@/store/useCart";
import CheckoutDrawer from "./CheckoutDrawer";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <CheckoutDrawer 
      isOpen={isOpen}
      onClose={onClose}
      items={items}
      title="Keranjang Belanja"
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      showAddMore={true}
    />
  );
}
