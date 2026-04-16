"use client";

import { useCart } from "@/store/useCart";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Halo kak, saya mau pesan:\n\n";
    items.forEach(item => {
      message += `- ${item.name} x ${item.quantity}\n`;
      message += `  Rp ${item.price.toLocaleString("id-ID")}\n`;
    });
    message += `\nTotal: Rp ${totalPrice().toLocaleString("id-ID")}\n\nApakah masih tersedia?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6288809482113?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is currently empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                      <p className="text-secondary font-semibold text-sm">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-primary"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-primary"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-500 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Price</span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Rp {totalPrice().toLocaleString("id-ID")}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
