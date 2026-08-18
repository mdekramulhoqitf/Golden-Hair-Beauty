"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product, products } from "@/data/products";

export interface CartLine {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = "goldenhair-cart";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const persist = useCallback((next: CartLine[]) => {
    const serializable = next.map((l) => ({ productId: l.product.id, quantity: l.quantity }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: { productId: string; quantity: number }[] = JSON.parse(raw);
        const restored = stored
          .map((s) => {
            const product = products.find((p) => p.id === s.productId);
            return product ? { product, quantity: s.quantity } : null;
          })
          .filter((l): l is CartLine => l !== null);
        setLines(restored);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.product.id === product.id);
        const next = existing
          ? prev.map((l) =>
              l.product.id === product.id
                ? { ...l, quantity: l.quantity + quantity }
                : l
            )
          : [...prev, { product, quantity }];
        persist(next);
        return next;
      });
      setIsOpen(true);
    },
    [persist]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setLines((prev) => {
        const next = prev.filter((l) => l.product.id !== productId);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setLines((prev) => {
        const next =
          quantity <= 0
            ? prev.filter((l) => l.product.id !== productId)
            : prev.map((l) => (l.product.id === productId ? { ...l, quantity } : l));
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
