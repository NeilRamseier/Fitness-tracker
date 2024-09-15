// UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: string;
  basal_metabolic_rate?: number;
  IP?: string;
  creation_date?: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
