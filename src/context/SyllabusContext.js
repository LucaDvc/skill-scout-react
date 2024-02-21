import React, { createContext, useContext, useState } from 'react';

export const SyllabusContext = createContext();

export function SyllabusProvider({ children }) {
  const [chapters, setChapters] = useState([]);

  return (
    <SyllabusContext.Provider value={{ chapters, setChapters }}>
      {children}
    </SyllabusContext.Provider>
  );
}
