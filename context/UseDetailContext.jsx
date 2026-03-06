import React, { createContext, useContext, useState } from 'react';

const UseDetailContext = createContext();

export const useDetail = () => {
  const context = useContext(UseDetailContext);
  if (!context) {
    throw new Error('useDetail must be used within a UseDetailProvider');
  }
  return context;
};

export const UseDetailProvider = ({ children }) => {
  const [detail, setDetail] = useState(null);

  return (
    <UseDetailContext.Provider value={{ detail, setDetail }}>
      {children}
    </UseDetailContext.Provider>
  );
};
