import React, { createContext, useContext, useState } from "react";

export type RatingItem = {
  id: number;
  stars: number;
  comment: string;
  createdAt: string;
};

type RatingContextType = {
  ratings: RatingItem[];
  addRating: (stars: number, comment: string) => void;
};

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider = ({ children }: { children: React.ReactNode }) => {
  const [ratings, setRatings] = useState<RatingItem[]>([]);

  const addRating = (stars: number, comment: string) => {
    const newRating: RatingItem = {
      id: Date.now(),
      stars,
      comment,
      createdAt: new Date().toLocaleString(),
    };

    setRatings((prev) => [newRating, ...prev]);
  };

  return (
    <RatingContext.Provider value={{ ratings, addRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating phải được dùng bên trong RatingProvider");
  }
  return context;
};
