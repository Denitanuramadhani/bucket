"use client";

import { use } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { useCart } from "@/store/useCart";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import CheckoutDrawer from "@/components/CheckoutDrawer";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const product = products.find((p) => p.id === unwrappedParams.id);
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleCheckoutNow = () => {
    setQuantity(1); // Reset to 1 when opening
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (_id: string, q: number) => {
    setQuantity(Math.max(1, q));
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Checkout Drawer for Direct Buy */}
      <CheckoutDrawer 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={[{ ...product, quantity }]}
        title="Checkout Pesanan"
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Decorative gradient blob */}
      <div className="absolute top-20 right-0 w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-10 font-medium"
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span>Back to Shop</span>
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-xl mx-auto"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm w-fit mb-6 shadow-sm border border-primary/20 tracking-wide uppercase">
              {product.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8 inline-block">
              Rp {product.price.toLocaleString("id-ID")}
            </div>
            
            <div className="prose prose-lg text-gray-600 mb-12 bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <p className="leading-relaxed">{product.description}</p>
            </div>
            
            <div className="flex flex-row gap-3 md:gap-4 mt-8">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 md:py-5 rounded-full font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 border-2 ${
                  isAdded 
                    ? "bg-green-50 text-green-600 border-green-200" 
                    : "bg-white text-gray-800 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                {isAdded ? "Added!" : "Add to Cart"}
              </button>
              
              <button 
                onClick={handleCheckoutNow}
                className="flex-[1.2] py-4 md:py-5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

