import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function useLayout() {
  return useContext(LayoutContext);
}

export function LayoutProvider({ children }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [navbarFixed, setNavbarFixed] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        showNavbar,
        setShowNavbar,
        showFooter,
        setShowFooter,
        navbarFixed,
        setNavbarFixed,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
