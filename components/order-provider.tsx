"use client";

import { createContext, useContext, useState, useCallback } from "react";

import { OrderModal } from "@/components/order-modal";

interface OrderContextType {
  openOrder: (preselect?: string) => void;
}

const OrderContext = createContext<OrderContextType>({ openOrder: () => {} });

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselect, setPreselect] = useState<string | undefined>();

  const openOrder = useCallback((pre?: string) => {
    setPreselect(pre);
    setIsOpen(true);
  }, []);

  return (
    <OrderContext.Provider value={{ openOrder }}>
      {children}
      <OrderModal
        isOpen={isOpen}
        preselect={preselect}
        onClose={() => setIsOpen(false)}
      />
    </OrderContext.Provider>
  );
};
