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
  calories: number | null;
  setCalories: React.Dispatch<React.SetStateAction<number | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({});
  const [calories, setCalories] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, calories, setCalories }}>
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
