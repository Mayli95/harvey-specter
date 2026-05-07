"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ContactModalContextType = {
  isOpen:     boolean;
  openModal:  () => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen:     false,
  openModal:  () => {},
  closeModal: () => {},
});

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        openModal:  () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export const useContactModal = () => useContext(ContactModalContext);
