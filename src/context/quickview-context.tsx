"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

interface QuickViewContextValue {
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

const QuickViewContext = createContext<QuickViewContextValue | undefined>(undefined);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <QuickViewContext.Provider
      value={{
        product,
        open: (p) => setProduct(p),
        close: () => setProduct(null),
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
}
