"use client";

import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

const initialState = { from: undefined, to: undefined };

function PlayerProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <PlayerContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { PlayerProvider, usePlayer };
